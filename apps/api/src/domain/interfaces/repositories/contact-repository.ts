import { Contact } from "../../entities/contact"

export interface ContactRepository {
  create(contact: Contact): Promise<Contact>;
  update(contact: Contact): Promise<Contact>;
  delete(contact: Contact): Promise<void>;
  find(id: string): Promise<Contact>;
  findAll(): Promise<Contact[]>;
}