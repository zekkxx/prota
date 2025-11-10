// export interface User {
// _id: String;
// username: String;
// email: String;
// avatar_url: String;
// display_name: String;
// projects: Project[];
// }

// export interface Task {
//     _id: String;
//     name: String;
//     description: String;
//     created_at: Date;
//     closed_at: Date;
//     status: "OPEN" | "IN_PROGRESS" | "DONE" | "CLOSED";
//     assignee: User | null;
//     project_ref: String;
//     sprint_ref: String;
// }

// export interface Project {
//     _id: String;
//     name: String;
//     created_by: String;
//     created_on: Date;
//     status: "OPEN" | "IN_PROGRESS" | "CLOSED";
//     owners: User[];
//     contributors: User[];
//     sprints: Sprint[];
// }

// export interface Sprint {
//     _id: String;
//     name: String;
//     start_date: Date;
//     end_date: Date;
//     closed_date: Date;
//     status: "OPEN" | "IN_PROGRESS" | "CLOSED";
//     project_ref: String;
//     tasks: Task[];
// }
