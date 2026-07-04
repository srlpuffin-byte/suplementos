export interface Branch {
  id: string;
  name: string;
  address: string;
  hours: string;
  isPickupAvailable?: boolean;
}

export const branches: Branch[] = [
  {
    id: "1",
    name: "LOCAL PRINCIPAL — MARCOS JUÁREZ",
    address: "San Martín 848, MsJz., Córdoba",
    hours: "Lunes a Viernes de 9:00 a 13:00 hs y 16:00 a 20:00 hs\nSábados de 9:00 a 13:00 hs",
    isPickupAvailable: true,
  },
  {
    id: "2",
    name: "ZONA LEONES",
    address: "Sarmiento 1142, Leones, Córdoba",
    hours: "Consultá horarios en @tipsysuplementos.ar",
    isPickupAvailable: true,
  },
];
