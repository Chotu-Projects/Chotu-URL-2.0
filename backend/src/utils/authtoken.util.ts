const rand = () => Math.random().toString(36).substring(2);

export const authToken = () => rand() + rand();
