export type Project = {
  id: string;
  name: string;
  type: string;
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id">;
        Update: Partial<Project>;
      };
    };
  };
};
