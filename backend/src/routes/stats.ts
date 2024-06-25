import express, { Request, Response } from "express";
import { db, auth } from "../firebase";
import { Appointment } from "../model/appointment";
import axios from "axios";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const appointmentsSnapshot = await db.collection("appointments").get();
    const appointments: Appointment[] = appointmentsSnapshot.docs.map(
      (doc) => doc.data() as Appointment
    );

    const petsResponse = await axios.get(
      "https://gist.githubusercontent.com/DiegoMagdaleno/d1293fe76c253c22479c0c9f23132327/raw/ede111e5de0f7a4bb35895077bc49e1841b3ee2a/pets.json"
    );
    const pets = petsResponse.data;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthAppointments = appointments.filter((appointment) => {
      let dateComponents = appointment.date.split("/");
      const appointmentDate = new Date(
        parseInt(dateComponents[2]),
        parseInt(dateComponents[1]) - 1,
        parseInt(dateComponents[0])
      );
      return (
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      );
    });

    const petAppointmentCounts: { [key: number]: number } = {};
    currentMonthAppointments.forEach((appointment) => {
      if (petAppointmentCounts[appointment.petId]) {
        petAppointmentCounts[appointment.petId]++;
      } else {
        petAppointmentCounts[appointment.petId] = 1;
      }
    });

    const responseData = Object.keys(petAppointmentCounts).map((petId) => {
      const pet = pets.find((p: any) => p.id === parseInt(petId));
      return {
        name: pet.name,
        value: petAppointmentCounts[parseInt(petId)],
        extra: {
          code: pet.species.slice(0, 2).toLowerCase(),
        },
      };
    });

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Something happened" });
  }
});

router.get("/app-month", async (req: Request, res: Response) => {
  try {
    const appointmentsSnapshot = await db.collection("appointments").get();
    const appointments: Appointment[] = appointmentsSnapshot.docs.map(
      (doc) => doc.data() as Appointment
    );

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthAppointments = appointments.filter((appointment) => {
      let dateComponents = appointment.date.split("/");
      const appointmentDate = new Date(
        parseInt(dateComponents[2]),
        parseInt(dateComponents[1]) - 1,
        parseInt(dateComponents[0])
      );
      return (
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      );
    });

    res.json({ totalAppointments: currentMonthAppointments.length });
  } catch (error) {
    res.status(500).json({ error: "Something happened" });
  }
});

router.get("/popular", async (req: Request, res: Response) => {
  try {
    const appointmentsSnapshot = await db.collection("appointments").get();
    const appointments: Appointment[] = appointmentsSnapshot.docs.map(
      (doc) => doc.data() as Appointment
    );

    const petsResponse = await axios.get(
      "https://gist.githubusercontent.com/DiegoMagdaleno/d1293fe76c253c22479c0c9f23132327/raw/ede111e5de0f7a4bb35895077bc49e1841b3ee2a/pets.json"
    );
    const pets = petsResponse.data;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthAppointments = appointments.filter((appointment) => {
      let dateComponents = appointment.date.split("/");
      const appointmentDate = new Date(
        parseInt(dateComponents[2]),
        parseInt(dateComponents[1]) - 1,
        parseInt(dateComponents[0])
      );
      return (
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      );
    });

    const speciesCount: { [key: string]: number } = { perro: 0, gato: 0 };

    currentMonthAppointments.forEach((appointment) => {
      const pet = pets.find((p: any) => p.id === appointment.petId);
      if (pet) {
        speciesCount[pet.species.toLowerCase()]++;
      }
    });

    const mostPopularSpecies =
      speciesCount.perro >= speciesCount.gato ? "Perro" : "Gato";

    res.json({ mostPopularSpecies });
  } catch (error) {
    res.status(500).json({ error: "Something happened" });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const listAllUsers = (nextPageToken?: string): Promise<any[]> => {
      return auth.listUsers(1000, nextPageToken).then((listUsersResult) => {
        const users = listUsersResult.users;
        if (listUsersResult.pageToken) {
          return listAllUsers(listUsersResult.pageToken).then((nextUsers) => {
            return users.concat(nextUsers);
          });
        }
        return users;
      });
    };

    const allUsers = await listAllUsers();
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(currentDate.getMonth() - 1);

    const usersRegisteredLastMonth = allUsers.filter((user) => {
      const creationDate = new Date(user.metadata.creationTime);
      return creationDate >= lastMonth && creationDate <= currentDate;
    });

    res.json({ totalUsers: usersRegisteredLastMonth.length });
  } catch (error) {
    res.status(500).json({ error: "Something happened" });
  }
});

export default router;
