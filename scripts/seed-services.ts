import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

const services = [
  {
    _id: new ObjectId(),
    name: "Baby Care",
    slug: "baby-care",
    description:
      "Reliable and compassionate care for babies, including supervision, feeding, hygiene, and daily activities.",
    image: "/images/services/baby-care.jpg",
    hourlyRate: 300,
    dailyRate: 2000,
    features: [
      "Baby supervision",
      "Feeding assistance",
      "Personal hygiene support",
      "Play and activity support",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "Elderly Service",
    slug: "elderly-service",
    description:
      "Compassionate support for elderly people with daily activities, companionship, and personal care.",
    image: "/images/services/elderly-care.jpg",
    hourlyRate: 350,
    dailyRate: 2500,
    features: [
      "Daily activity assistance",
      "Companionship",
      "Medication reminders",
      "Personal care support",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "Sick People Service",
    slug: "sick-people-service",
    description:
      "Dedicated support for people who need assistance during illness, recovery, or special-care situations.",
    image: "/images/services/sick-care.jpg",
    hourlyRate: 400,
    dailyRate: 2800,
    features: [
      "Patient companionship",
      "Daily activity assistance",
      "Meal assistance",
      "Recovery support",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedServices() {
  try {
    const db = await getDatabase();
    const collection = db.collection("services");

    await collection.deleteMany({});
    await collection.insertMany(services);

    console.log("✅ Services seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed services:", error);
  }
}

seedServices();