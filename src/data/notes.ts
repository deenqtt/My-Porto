import { Note } from '@/types';

export const notes: Note[] = [
  {
    id: '1',
    slug: 'mqtt-telemetry-pipeline',
    title: 'Designing High-Reliability MQTT Telemetry Pipelines',
    summary: 'A deep dive into architecting real-time data flows between edge sensors and cloud dashboards using MQTT brokers and Python bridges.',
    category: 'Telemetry',
    date: '2025-05-10',
    tags: ['MQTT', 'Python', 'Industrial IoT', 'Architecture'],
    content: `
# High-Reliability MQTT Telemetry Pipelines

In industrial environments, data reliability is paramount. When bridging hardware (ESP32/Raspberry Pi) to modern web interfaces, the choice of protocol and the architecture of the middle layer determines the system's stability.

## 1. The MQTT Broker Selection
We typically utilize EMQX or Mosquitto for high-concurrency needs. EMQX provides a robust rule engine that allows for preliminary data processing before it even reaches the middleware.

## 2. The Python Bridge Layer
A custom Python bridge acts as the orchestrator. Its responsibilities include:
- Subscribing to raw telemetry topics.
- Normalizing varied JSON schemas from different sensors.
- Handling data persistence (Supabase/PostgreSQL) for historical auditing.
- Publishing processed events to a dedicated 'clean' topic for the Frontend to consume via WebSockets.

## 3. Handling Reverse Flow
Bidirectional communication is implemented by using a command topic structure. Commands sent from the dashboard are translated back into protocol-specific payloads (e.g., Modbus register writes) by the bridge.

## 4. Key Challenges
- **Network Latency:** Minimizing the hops between the physical device and the UI.
- **Data Consistency:** Ensuring that intermittent hardware failures don't lead to corrupted telemetry state.
    `
  },
  {
    id: '2',
    slug: 'ai-meeting-workflows',
    title: 'STT/TTS Workflows for AI-Powered Meeting Assistants',
    summary: 'Exploring the integration of real-time speech processing and LLM-driven summarization for intelligent office orchestration.',
    category: 'AI Workflow',
    date: '2025-05-15',
    tags: ['AI', 'STT', 'Python', 'Automation', 'Productivity'],
    content: `
# AI-Powered Meeting Workflows

The goal of an AI Meeting Assistant is to reduce administrative overhead by automating the transcription and summarization of discussions.

## 1. Real-time Speech-to-Text (STT)
Using models like Whisper or industry-grade APIs (Google Cloud Speech, Deepgram), the system captures audio streams directly from the room hardware. The challenge lies in noise cancellation and speaker diarization.

## 2. LLM Orchestration
Once the text is captured, an LLM (GPT-4 or local Llama models) processes the raw transcript to extract:
- Action items.
- Decisions made.
- Key discussion points.

## 3. Smart Room Integration
By connecting the assistant to the IoT ecosystem via MQTT, we can trigger physical actions:
- Auto-dimming lights when a meeting starts.
- Sending summaries via email once the 'Stop' command is detected.
- Real-time status display on the dashboard.

## 4. Future Experimentation
We are currently exploring custom wake-word detection (e.g., "Jarvis" or "System") to allow for hands-free orchestration of the entire engineering workspace.
    `
  }
];
