import { Subject } from "@/types";

export const DEPARTMENTS = [
    'CS',
    'Math',
    'English',
];

export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => ({
    label: dept,
    value: dept,
}));

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: "1",
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "Fundamentals of programming, algorithms, and computational thinking using Python.",
        createdAt: new Date("2024-01-15"),
    },
    {
        id: "2",
        code: "MATH201",
        name: "Calculus II",
        department: "Math",
        description: "Integration techniques, sequences, series, and applications of calculus.",
        createdAt: new Date("2024-01-20"),
    },
    {
        id: "3",
        code: "ENG301",
        name: "Advanced Academic Writing",
        department: "English",
        description: "Research-based writing, argumentation, and scholarly communication skills.",
        createdAt: new Date("2024-02-01"),
    },
];