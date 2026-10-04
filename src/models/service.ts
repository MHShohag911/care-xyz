import { getDatabase } from "@/lib/mongodb";
import { Service } from "@/types/service";
import { ObjectId } from "mongodb";

type ServiceDocument = Omit<Service, "_id"> & {
  _id: ObjectId;
};


const COLLECTION_NAME = "services";

export async function getServices(): Promise<Service[]> {
    const db = await getDatabase();

    const services = await db
    .collection<ServiceDocument>(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return services.map((service) => ({
    ...service,
    _id: service._id?.toString(),
  }));
}

export async function getServiceById(
  id: string
): Promise<Service | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDatabase();

  const service = await db
    .collection<ServiceDocument>(COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id),
    });

  if (!service) {
    return null;
  }

  return {
    ...service,
    _id: service._id?.toString(),
  };
}