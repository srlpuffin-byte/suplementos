import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";
import { eq, ilike, and, asc, desc, SQL } from "drizzle-orm";
import {
  ListProductsQueryParams,
  CreateProductBody,
  GetProductParams,
  UpdateProductParams,
  UpdateProductBody,
  DeleteProductParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

function mapProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    category: p.category,
    flavor: p.flavor ?? null,
    price: Number(p.price),
    originalPrice: p.originalPrice != null ? Number(p.originalPrice) : null,
    discountBadge: p.discountBadge ?? null,
    stock: p.stock,
    images: (p.images as string[]) ?? [],
    featured: p.featured,
    active: p.active,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

// GET /api/products
router.get("/products", async (req, res) => {
  try {
    const query = ListProductsQueryParams.safeParse(req.query);
    const filters = query.success ? query.data : {};

    const conditions: SQL[] = [];

    if (filters.category) {
      conditions.push(eq(productsTable.category, filters.category));
    }
    if (filters.flavor) {
      conditions.push(eq(productsTable.flavor, filters.flavor));
    }
    if (filters.search) {
      conditions.push(ilike(productsTable.name, `%${filters.search}%`));
    }
    if (filters.featured !== undefined) {
      conditions.push(eq(productsTable.featured, filters.featured));
    }
    // Default: only active products unless admin explicitly requests all
    if (filters.active !== undefined) {
      conditions.push(eq(productsTable.active, filters.active));
    } else {
      conditions.push(eq(productsTable.active, true));
    }

    let orderBy = desc(productsTable.featured);
    if (filters.sort === "price_asc") orderBy = asc(productsTable.price);
    else if (filters.sort === "price_desc") orderBy = desc(productsTable.price);
    else if (filters.sort === "name_asc") orderBy = asc(productsTable.name);

    const rows = await db
      .select()
      .from(productsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderBy);

    res.json(rows.map(mapProduct));
  } catch (err) {
    req.log.error({ err }, "listProducts error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/products
router.post("/products", requireAdmin, async (req, res) => {
  try {
    const parsed = CreateProductBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
      return;
    }
    const data = parsed.data;
    const [row] = await db
      .insert(productsTable)
      .values({
        name: data.name,
        description: data.description ?? null,
        category: data.category,
        flavor: data.flavor ?? null,
        price: String(data.price),
        originalPrice: data.originalPrice != null ? String(data.originalPrice) : null,
        discountBadge: data.discountBadge ?? null,
        stock: data.stock ?? 0,
        images: (data.images as string[]) ?? [],
        featured: data.featured ?? false,
        active: data.active ?? true,
      })
      .returning();
    res.status(201).json(mapProduct(row));
  } catch (err) {
    req.log.error({ err }, "createProduct error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/products/:id
router.get("/products/:id", async (req, res) => {
  try {
    const parsed = GetProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [row] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, parsed.data.id));
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(mapProduct(row));
  } catch (err) {
    req.log.error({ err }, "getProduct error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/products/:id
router.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    const paramsParsed = UpdateProductParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const bodyParsed = UpdateProductBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid input", details: bodyParsed.error.issues });
      return;
    }
    const data = bodyParsed.data;

    const updateValues: Partial<typeof productsTable.$inferInsert> = {
      updatedAt: new Date(),
    };
    if (data.name !== undefined) updateValues.name = data.name;
    if (data.description !== undefined) updateValues.description = data.description ?? null;
    if (data.category !== undefined) updateValues.category = data.category;
    if (data.flavor !== undefined) updateValues.flavor = data.flavor ?? null;
    if (data.price !== undefined) updateValues.price = String(data.price);
    if (data.originalPrice !== undefined) updateValues.originalPrice = data.originalPrice != null ? String(data.originalPrice) : null;
    if (data.discountBadge !== undefined) updateValues.discountBadge = data.discountBadge ?? null;
    if (data.stock !== undefined) updateValues.stock = data.stock;
    if (data.images !== undefined) updateValues.images = data.images as string[];
    if (data.featured !== undefined) updateValues.featured = data.featured;
    if (data.active !== undefined) updateValues.active = data.active;

    const [row] = await db
      .update(productsTable)
      .set(updateValues)
      .where(eq(productsTable.id, paramsParsed.data.id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(mapProduct(row));
  } catch (err) {
    req.log.error({ err }, "updateProduct error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/products/:id
router.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    const parsed = DeleteProductParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [row] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, parsed.data.id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(204).end();
  } catch (err) {
    req.log.error({ err }, "deleteProduct error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
