import { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'first-iot-project',
    title: 'First IoT Project Deployed',
    description:
      'Successfully deployed my first production IoT system — RFID attendance for a local school, handling 200+ daily check-ins.',
    date: '2023-10',
    category: 'Project',
    icon: '🚀',
  },
  {
    id: 'open-source-contrib',
    title: 'First Open Source Contribution',
    description:
      'Merged a bug fix PR to an open-source Arduino library for the MFRC522 RFID module.',
    date: '2023-12',
    category: 'Open Source',
    icon: '🌟',
  },
  {
    id: '10-repos',
    title: '10+ Public Repositories',
    description:
      'Reached 10 public GitHub repositories, spanning IoT firmware, web backends, and frontend projects.',
    date: '2024-02',
    category: 'GitHub',
    icon: '📦',
  },
  {
    id: 'fullstack-mastery',
    title: 'Full-Stack IoT Mastery',
    description:
      'Built an end-to-end IoT system independently: from ESP32 firmware → MQTT broker → Node.js API → React dashboard.',
    date: '2024-04',
    category: 'Skill',
    icon: '⚡',
  },
  {
    id: 'freelance-first',
    title: 'First Freelance Client',
    description:
      'Landed first paid freelance project: building a custom monitoring dashboard for a small manufacturing company.',
    date: '2024-06',
    category: 'Career',
    icon: '💼',
  },
  {
    id: 'portfolio-launch',
    title: 'Portfolio v1 Launched',
    description:
      'Shipped this portfolio — built with Next.js 14, live GitHub stats, WakaTime integration, and a guestbook.',
    date: '2025-03',
    category: 'Personal',
    icon: '🎉',
  },
];
