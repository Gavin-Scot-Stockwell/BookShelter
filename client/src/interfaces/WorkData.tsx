import { VolunteerData } from "./VolunteerData";

export interface WorkData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedVolunteerId: number | null;
  assignedVolunteer: VolunteerData | null;
}
