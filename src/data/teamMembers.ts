export interface TeamMember {
  id: number;
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  miniAvatarUrl?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Neev",
    title: "Team Captain",
    handle: "neev",
    status: "Leading",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Vivan",
    title: "Lead Programmer",
    handle: "vivan",
    status: "Coding",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Akshat",
    title: "Mechanical Engineer",
    handle: "akshat",
    status: "Building",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Yesha",
    title: "Design Lead",
    handle: "yesha",
    status: "Designing",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Tishya",
    title: "Strategy Analyst",
    handle: "tishya",
    status: "Planning",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Maitreyi",
    title: "Software Engineer",
    handle: "maitreyi",
    status: "Developing",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 7,
    name: "Anya V",
    title: "Hardware Specialist",
    handle: "anyav",
    status: "Assembling",
    avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=360&h=500&fit=crop",
  },
  {
    id: 8,
    name: "Anya Y",
    title: "Research Lead",
    handle: "anyay",
    status: "Researching",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=360&h=500&fit=crop",
  },
];