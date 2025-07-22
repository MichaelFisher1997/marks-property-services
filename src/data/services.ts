export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "building",
    title: "Building Work",
    icon: "🏗️",
    description:
      "Professional building services for all your construction needs",
    items: [
      "Wall Building & Repair",
      "Block Paving",
      "Patio Repair & Laying",
      "General Roofing including Ridge Tile Reset & Pointing",
    ],
  },
  {
    id: "painting",
    title: "Painting & Decorating",
    icon: "🎨",
    description:
      "Transform your space with expert painting and decorating services",
    items: [
      "Kitchen Fitting",
      "Door Hanging & Rehanging",
      "Tiling Floors & Walls",
      "Fencing & Decking",
    ],
  },
  {
    id: "more",
    title: "Much More",
    icon: "🔧",
    description:
      "Additional services to meet all your property maintenance needs",
    items: [
      "Wall & Chimney Repointing",
      "Security Locks for Doors & Windows",
      "Upgrading of Door Locks & Window Furniture",
      "Plumbing",
    ],
  },
];
