'use server';

import { d1Connection } from '@/db/d1-connection';
import { d1BindingDB } from '@/db/d1-databinding';
import { people } from '@/db/schema';

import { personas } from '@/seed';

// Función para inicializar la conexión (debe llamarse una vez al inicio)
export async function initializeDatabase(d1Binding: D1Database) {
  d1Connection.initialize(d1Binding);
}

export async function getAllPeoples() {
  try {
    if (!d1Connection.isInitialized()) {
      d1Connection.initialize(d1BindingDB);
    }

    const db = d1Connection.getDB();
    const allPeoples = await db.query.people.findMany({});

    return { success: true, data: allPeoples };
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return { success: false, error: 'Error al obtener clientes' };
  }
}

// Obtener todos los clientes
export async function insertPeoples() {
  try {
    if (!d1Connection.isInitialized()) {
      d1Connection.initialize(d1BindingDB);
    }

    const db = d1Connection.getDB();
    await db.delete(people);
    personas.map(async (person) => {
      await db.insert(people).values({
        ...person,
      });
    });
    // await db.insert(people).values();
    return { success: true };
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return { success: false, error: 'Error al obtener clientes' };
  }
}

export async function deletePeople(): Promise<{ success: boolean; error?: string | undefined }> {
  try {
    if (!d1Connection.isInitialized()) {
      d1Connection.initialize(d1BindingDB);
    }

    const db = d1Connection.getDB();
    await db.delete(people);

    return { success: true, error: undefined };
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return { success: false, error: 'Error al obtener clientes' };
  }
}
