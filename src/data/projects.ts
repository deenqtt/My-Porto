import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'bacnet-poller',
    title: 'BACnet/IP Protocol Poller',
    description:
      'Industrial protocol poller for BACnet/IP networks. Reads data points from BACnet devices (BMS, HVAC controllers) and publishes to a shared JSON data store for downstream processing.',
    tags: ['Python', 'BACnet', 'IoT', 'Industrial', 'MQTT'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Protocol Research',
        description:
          'Studied BACnet/IP object model, property identifiers, and read-property-multiple service for efficient bulk polling.',
        duration: '3 days',
      },
      {
        phase: 'Poller Implementation',
        description:
          'Built async BACnet/IP client to discover devices, enumerate objects, and periodically poll values. Results published to shared JSON data store.',
        duration: '1 week',
      },
      {
        phase: 'Integration & Testing',
        description:
          'Tested against real BACnet devices. Added error handling for offline devices and type normalization for analog/binary/multi-state values.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'modbus-snmp-poller',
    title: 'Modbus + SNMP Poller',
    description:
      'Dual-protocol poller supporting Modbus RTU/TCP and SNMP v1/v2c/v3. Reads registers from PLCs and OIDs from network devices, with AES-encrypted config and relay control support.',
    tags: ['Python', 'Modbus', 'SNMP', 'Industrial', 'MQTT', 'AES'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Modbus Implementation',
        description:
          'Built Modbus RTU (serial) and TCP poller with configurable register maps. Added address scanner utility and relay control via write commands.',
        duration: '1 week',
      },
      {
        phase: 'SNMP Implementation',
        description:
          'Integrated pysnmp for SNMP v1/v2c/v3 OID polling from network devices (UPS, PDU, switches). Added SNMP SET for control operations.',
        duration: '1 week',
      },
      {
        phase: 'Security & Config',
        description:
          'Implemented AES key-based configuration encryption. Added MQTT publish/subscribe for remote control commands.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'ethernetip-poller',
    title: 'EtherNet/IP Protocol Poller',
    description:
      'EtherNet/IP poller for Allen-Bradley PLCs and compatible devices. Reads tag data via CIP protocol and publishes normalized values to the middleware data bus.',
    tags: ['Python', 'EtherNet/IP', 'CIP', 'PLC', 'Allen-Bradley', 'Industrial'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'CIP Protocol Study',
        description:
          'Studied Common Industrial Protocol (CIP) and EtherNet/IP encapsulation for tag-based data access on Allen-Bradley controllers.',
        duration: '3 days',
      },
      {
        phase: 'Poller & Test Client',
        description:
          'Built EtherNet/IP tag reader with configurable poll interval. Wrote test client (test_eip_client.py) for validation against real PLCs.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'profinet-poller',
    title: 'PROFINET Protocol Poller',
    description:
      'PROFINET data poller targeting Siemens PLCs and PROFINET-capable devices. Bridges industrial PROFINET data to the middleware via a Python bridge layer.',
    tags: ['Python', 'PROFINET', 'Siemens', 'PLC', 'Industrial'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Bridge Architecture',
        description:
          'Designed Python bridge (PYTHON_BRIDGE) to interface with PROFINET stack, abstracting low-level protocol details from the poller logic.',
        duration: '3 days',
      },
      {
        phase: 'Data Polling',
        description:
          'Implemented periodic polling of PROFINET process data with normalization to the shared JSON schema used across all protocol modules.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'opcua-poller',
    title: 'OPC-UA Protocol Poller',
    description:
      'OPC-UA client that browses server node trees, subscribes to data changes, and polls values from industrial automation systems following the IEC 62541 standard.',
    tags: ['Python', 'OPC-UA', 'IEC 62541', 'Industrial', 'SCADA'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Server Discovery',
        description:
          'Built OPC-UA server browser (browse_server.py) to enumerate node trees and identify relevant data points for polling configuration.',
        duration: '2 days',
      },
      {
        phase: 'Subscription & Polling',
        description:
          'Implemented OPC-UA subscription mode for change-triggered updates and periodic polling fallback. Handles session reconnection on server restart.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'goose-listener',
    title: 'GOOSE / IEC 61850 Listener',
    description:
      'Layer 2 multicast GOOSE message listener following the IEC 61850 standard. Captures protection and control events from IEDs and RTUs in substation automation networks.',
    tags: ['Python', 'IEC 61850', 'GOOSE', 'Substation', 'Industrial', 'L2 Multicast'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'IEC 61850 Study',
        description:
          'Studied GOOSE (Generic Object Oriented Substation Events) message structure, APPID, dataset encoding, and multicast group subscription.',
        duration: '4 days',
      },
      {
        phase: 'Listener Implementation',
        description:
          'Built raw Layer 2 packet capture for GOOSE multicast frames. Parses ASN.1 BER-encoded dataset values and publishes decoded events to data store.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'iec104-poller',
    title: 'IEC 60870-5-104 Poller',
    description:
      'IEC 60870-5-104 client for polling telecontrol data from RTUs and SCADA systems over TCP/IP. Handles spontaneous transmissions, interrogation commands, and time-tagged data.',
    tags: ['Python', 'IEC 60870-5-104', 'SCADA', 'RTU', 'Industrial', 'Telecontrol'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Protocol Implementation',
        description:
          'Built IEC 60870-5-104 APDU parser and client using c104 library. Handles connection setup, general interrogation, and spontaneous data object parsing.',
        duration: '1 week',
      },
      {
        phase: 'Station & Point Validation',
        description:
          'Wrote check_c104_station.py and check_c104_point.py utilities to validate connectivity and verify data point addresses before production deployment.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'sparkplug-handler',
    title: 'Sparkplug B Handler',
    description:
      'MQTT Sparkplug B message handler for IIoT edge devices. Decodes Sparkplug B payloads (Google Protobuf) from NBIRTH, DBIRTH, DDATA, and DDEATH messages into normalized data.',
    tags: ['Python', 'Sparkplug B', 'MQTT', 'Protobuf', 'IIoT', 'Edge'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'Sparkplug B Study',
        description:
          'Studied Sparkplug B specification: topic namespace (spBv1.0), payload encoding via Google Protobuf, and birth/death/data message lifecycle.',
        duration: '3 days',
      },
      {
        phase: 'Handler Implementation',
        description:
          'Built MQTT subscriber that decodes Protobuf-encoded Sparkplug B payloads, reconstructs metric state from BIRTH messages, and handles metric updates from DATA messages.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'ocpp-handler',
    title: 'OCPP EV Charger Handler',
    description:
      'OCPP (Open Charge Point Protocol) handler for EV charging station integration. Manages charger communication over WebSocket, processes status notifications, meter values, and transaction events.',
    tags: ['Python', 'OCPP', 'WebSocket', 'EV Charging', 'IoT'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-in',
    year: 2025,
    process: [
      {
        phase: 'OCPP Study',
        description:
          'Studied OCPP 1.6/2.0 message flow: BootNotification, StatusNotification, MeterValues, StartTransaction, StopTransaction over WebSocket JSON.',
        duration: '3 days',
      },
      {
        phase: 'Handler Implementation',
        description:
          'Built OCPP Central System handler to accept charger connections, respond to requests, and publish normalized charging session data to the middleware data bus.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'bacnet-server',
    title: 'BACnet/IP Server',
    description:
      'BACnet/IP server that exposes unified industrial data as a virtual BACnet device on UDP port 47808. Allows BMS clients and BACnet explorers to read data points via standard ReadProperty and ReadPropertyMultiple services.',
    tags: ['Python', 'BACnet', 'BMS', 'Industrial', 'UDP'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'BACnet Device Emulation',
        description:
          'Implemented virtual BACnet device with configurable object list (Analog Input, Binary Input, Multi-State). Responds to Who-Is, I-Am, and property read requests.',
        duration: '1 week',
      },
      {
        phase: 'Data Mapping & Hot-Reload',
        description:
          'Built dynamic mapping from shared JSON data store to BACnet object identifiers. Supports hot-reload via MQTT without server restart.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'modbus-tcp-server',
    title: 'Modbus TCP Server',
    description:
      'Modbus TCP server (port 502) that exposes industrial data as Modbus holding registers. Allows PLC masters and SCADA systems to poll data using standard Modbus function codes.',
    tags: ['Python', 'Modbus TCP', 'PLC', 'SCADA', 'Industrial'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'Register Mapping',
        description:
          'Designed register address map from shared JSON data store to Modbus holding registers with configurable scaling and data type conversion (float, int, bool).',
        duration: '3 days',
      },
      {
        phase: 'Server Implementation',
        description:
          'Built Modbus TCP server handling function codes FC03 (read holding registers) and FC04 (read input registers). Supports multiple simultaneous master connections.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'snmp-agent-server',
    title: 'SNMP Agent Server',
    description:
      'SNMP Agent (port 161/UDP) with a custom enterprise MIB (Container-MIB) exposing data center metrics. Supports v1/v2c/v3, dynamic OID registration, and MQTT-based CRUD for real-time config updates.',
    tags: ['Python', 'SNMP', 'MIB', 'NMS', 'MQTT', 'Data Center'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'Custom MIB Design',
        description:
          'Authored Container-MIB.mib with enterprise OID tree covering power, cooling, environment, battery, and solar subsections for data center monitoring.',
        duration: '3 days',
      },
      {
        phase: 'Agent Implementation',
        description:
          'Built SNMP agent with dynamic OID registration (RegOID.py) and GET/GETNEXT/GETBULK handler. Integrated subsections_crud.py for live MQTT-triggered config updates.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'goose-publisher',
    title: 'GOOSE Publisher (IEC 61850)',
    description:
      'IEC 61850 GOOSE publisher that broadcasts Layer 2 multicast frames to IEDs and RTUs in substation networks. Includes a security layer for message authentication and replay protection.',
    tags: ['Python', 'IEC 61850', 'GOOSE', 'L2 Multicast', 'Substation', 'Security'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'GOOSE Frame Construction',
        description:
          'Implemented GOOSE PDU encoding (ASN.1 BER), Ethernet frame construction with correct APPID and multicast MAC, and configurable dataset mapping.',
        duration: '1 week',
      },
      {
        phase: 'Security Layer',
        description:
          'Added goose_security.py for HMAC-based message authentication and sequence number tracking to prevent replay attacks on the substation network.',
        duration: '4 days',
      },
    ],
  },
  {
    id: 'iec104-server',
    title: 'IEC 60870-5-104 Server',
    description:
      'IEC 60870-5-104 server (port 2404/TCP) that exposes industrial data to SCADA masters. Handles general interrogation, spontaneous transmission, and time-tagged data objects.',
    tags: ['Python', 'IEC 60870-5-104', 'SCADA', 'Telecontrol', 'TCP'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'Server Implementation',
        description:
          'Built IEC 60870-5-104 server responding to general interrogation commands and sending spontaneous data transmissions for changed values.',
        duration: '1 week',
      },
      {
        phase: 'Validation Tools',
        description:
          'Wrote check_c104_station.py, check_c104_point.py, and inspect_client_connection.py for testing and diagnosing SCADA master connections.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'opcua-server',
    title: 'OPC-UA Server',
    description:
      'OPC-UA server (IEC 62541) that exposes a browsable node tree of industrial data points. Supports subscription-based change notifications and polling by OPC-UA clients.',
    tags: ['Python', 'OPC-UA', 'IEC 62541', 'SCADA', 'Industrial'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'Node Tree Design',
        description:
          'Designed OPC-UA address space with folders per subsection (power, cooling, environment). Each data point exposed as a Variable node with correct data type.',
        duration: '3 days',
      },
      {
        phase: 'Server & Test Client',
        description:
          'Built OPC-UA server with dynamic node population from shared JSON store. Wrote test_client.py to verify browse, read, and subscription functionality.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'sparkplug-publisher',
    title: 'Sparkplug B Publisher',
    description:
      'MQTT Sparkplug B publisher that sends IIoT edge data following the Sparkplug B specification with Protobuf encoding, TLS support, and automatic log rotation.',
    tags: ['Python', 'Sparkplug B', 'MQTT', 'Protobuf', 'TLS', 'IIoT'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'Sparkplug B Implementation',
        description:
          'Built Sparkplug B publisher encoding metrics via Google Protobuf. Handles NBIRTH, DBIRTH, DDATA, and DDEATH message lifecycle per specification.',
        duration: '1 week',
      },
      {
        phase: 'TLS & Reliability',
        description:
          'Added TLS certificate support for secure MQTT connections. Implemented log rotation (LOG_ROTATION_SETUP) and automatic reconnection on broker disconnect.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'ethernetip-server',
    title: 'EtherNet/IP Server',
    description:
      'EtherNet/IP server (port 44818/TCP) targeting Allen-Bradley PLC masters. Full CIP protocol implementation with authentication, heartbeat monitoring, dynamic datamap generation, and security layer.',
    tags: ['Python', 'EtherNet/IP', 'CIP', 'Allen-Bradley', 'Industrial', 'Security'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'CIP Protocol Stack',
        description:
          'Implemented CIP protocol (cip_protocol.py) with EtherNet/IP encapsulation, register session, forward open, and tag read/write service handling.',
        duration: '1 week',
      },
      {
        phase: 'Auth & Security',
        description:
          'Added ethernetip_auth.py and ethernetip_security.py for connection authentication and session key management. Built generate_security.sh for key provisioning.',
        duration: '4 days',
      },
      {
        phase: 'Datamap & Heartbeat',
        description:
          'Built ethernetip_datamap_generator.py for automatic tag-to-register mapping from JSON config. Added heartbeat module to detect and recover stale connections.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'ocpp-client',
    title: 'OCPP Client (EV Charger)',
    description:
      'OCPP active client that connects to an external CSMS (Charge Point Management System) via WebSocket. Sends EV charger telemetry and handles remote commands from the CSMS.',
    tags: ['Python', 'OCPP', 'WebSocket', 'EV Charging', 'CSMS'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'OCPP Client Implementation',
        description:
          'Built OCPP 1.6 WebSocket client that connects outbound to an external CSMS. Sends BootNotification, StatusNotification, MeterValues, and handles RemoteStartTransaction commands.',
        duration: '1 week',
      },
      {
        phase: 'Config & Topology',
        description:
          'Documented connection topology (TOPOLOGY.md) and built JSON-based config for CSMS endpoint, charger identity, and reconnection strategy.',
        duration: '2 days',
      },
    ],
  },
  {
    id: 'lora-gateway',
    title: 'LoRa Gateway Node',
    description:
      'LoRa gateway that bridges long-range LoRa RF sensor nodes (868/915 MHz) to the industrial data bus. Receives sensor payloads from remote nodes and normalizes them into the shared JSON data store.',
    tags: ['Python', 'LoRa', 'LoRaWAN', 'RF', 'IoT', 'Edge'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'protocol-out',
    year: 2025,
    process: [
      {
        phase: 'LoRa Node Implementation',
        description:
          'Built lora_node.py to interface with LoRa transceiver hardware, receive packets from remote sensor nodes, and decode payloads into structured data.',
        duration: '1 week',
      },
      {
        phase: 'Data Integration',
        description:
          'Normalized decoded LoRa sensor data into the shared JSON schema used across all middleware modules, enabling LoRa data to be re-exported via any Protocol OUT server.',
        duration: '2 days',
      },
    ],
  },
  {
    id: 'agv-simulation',
    title: 'AGV Simulation & Web Control UI',
    description:
      'ROS2 Humble + Gazebo simulation of an Autonomous Guided Vehicle with a Vue 3 web interface for real-time navigation, waypoint missions, auto-docking, and keepout zone management.',
    tags: ['ROS2', 'Gazebo', 'Vue 3', 'Docker', 'Nav2', 'SLAM', 'WebSocket'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'ROS2 Stack Setup',
        description:
          'Configured ROS2 Humble in Docker (Ubuntu 24.04 host incompatibility workaround). Set up TurtleBot3 waffle_pi with Gazebo world, SLAM Toolbox, and Navigation2.',
        duration: '1 week',
      },
      {
        phase: 'Navigation & Mapping',
        description:
          'Integrated slam_toolbox for real-time SLAM mapping and Nav2 for autonomous navigation with AMCL localization. Added keepout zone costmap filter.',
        duration: '1 week',
      },
      {
        phase: 'Auto-Docking',
        description:
          'Implemented opennav_docking for automatic charging dock approach and undocking via ROS2 action calls.',
        duration: '4 days',
      },
      {
        phase: 'Web Control UI',
        description:
          'Built Vue 3 dashboard with Leaflet map rendering OccupancyGrid, click-to-navigate, waypoint mission editor with loop mode, and live camera feed via web_video_server.',
        duration: '2 weeks',
      },
    ],
  },
  {
    id: 'machine-monitor-ai',
    title: 'Production Machine Monitor (AI Vision)',
    description:
      'Real-deployed system that monitors CNC/laser production machines using AI vision. A C# agent silently captures screenshots every 2 minutes; a Python server analyzes them with Qwen2.5VL to generate automated daily activity reports.',
    tags: ['Python', 'Flask', 'C#', 'Ollama', 'Qwen2.5VL', 'AI Vision', 'Systemd'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'Problem Analysis',
        description:
          'Identified need to monitor 3 production machine PCs (Trumpf, HSG Laser, LVD) without manual supervision. Designed screenshot-based approach to avoid software API dependencies.',
        duration: '2 days',
      },
      {
        phase: 'Windows Agent (C#)',
        description:
          'Built silent background agent in C# that captures screenshots every 2 minutes only when production software is active, then sends JPEG via HTTP POST to server.',
        duration: '1 week',
      },
      {
        phase: 'AI Analysis Server',
        description:
          'Built Flask server with Ollama integration running Qwen2.5VL 3B locally. Extracts machine state, productivity, job name, and change detection from each screenshot.',
        duration: '1 week',
      },
      {
        phase: 'Deployment',
        description:
          'Deployed server as Systemd service on Ubuntu. Screenshots auto-deleted after 3 days. All data stays on local network — no external transmission.',
        duration: '2 days',
      },
    ],
  },
  {
    id: 'smart-home-controller',
    title: 'Smart Home IoT Controller App',
    description:
      'Cross-platform Flutter app for controlling Smart Home IoT devices via MQTT. Features real-time device management, alarm monitoring, QR pairing, and dark/light theme.',
    tags: ['Flutter', 'Dart', 'MQTT', 'Provider', 'IoT', 'mobile_scanner'],
    github: 'https://github.com/deenqtt',
    status: 'completed',
    category: 'mobile',
    year: 2025,
    process: [
      {
        phase: 'Architecture & Design System',
        description:
          'Defined app structure with Provider state management, dark/light theme system, and a consistent design language across 6 screens.',
        duration: '3 days',
      },
      {
        phase: 'Core Screens',
        description:
          'Built Login, Dashboard (stats & quick actions), Devices (toggle + details modal), Alarms (filter chips + swipe to delete), and Settings screens.',
        duration: '2 weeks',
      },
      {
        phase: 'MQTT & IoT Integration',
        description:
          'Integrated mqtt_client for real-time device communication. Implemented QR scanner (mobile_scanner) for adding new devices.',
        duration: '1 week',
      },
      {
        phase: 'Notifications',
        description:
          'Added flutter_local_notifications for alarm push notifications with 4 severity levels: critical, warning, info, success.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'bubble-arena',
    title: 'Bubble Arena',
    description:
      'Experimental browser game controlled entirely by hand gestures using MediaPipe AI. Features real-time P2P multiplayer via WebRTC, face detection lobby, and a cyberpunk HUD aesthetic.',
    tags: ['React', 'TypeScript', 'MediaPipe', 'WebRTC', 'PeerJS', 'Framer Motion', 'Vite'],
    github: 'https://github.com/deenqtt',
    demo: 'https://bubble-pop-web-new.vercel.app/',
    status: 'completed',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'Concept & Tech Selection',
        description:
          'Explored gesture-based interaction options, chose MediaPipe Hand Landmarker for finger tracking and PeerJS (WebRTC) for P2P multiplayer without a backend.',
        duration: '3 days',
      },
      {
        phase: 'AI Gesture Tracking',
        description:
          'Integrated MediaPipe Hand Landmarker to track index finger tip as cursor. Added Face Detector for the face-sync lobby ready system.',
        duration: '1 week',
      },
      {
        phase: 'Game Engine',
        description:
          'Built bubble physics, particle effects, and collision detection in a custom canvas-based engine (Engine.ts). Orchestrated AI tracking and rendering in GameManager.',
        duration: '1 week',
      },
      {
        phase: 'Multiplayer Networking',
        description:
          'Implemented Host-Client architecture over PeerJS: host generates bubbles and broadcasts state, clients send hand position and pop events.',
        duration: '1 week',
      },
      {
        phase: 'Polish & Deployment',
        description:
          'Added cyberpunk UI with Framer Motion animations, dynamic audio with use-sound, then deployed to Vercel.',
        duration: '3 days',
      },
    ],
  },
  {
    id: 'binance-scalping-bot',
    title: 'Binance Scalping Bot',
    description:
      'Automated crypto scalping bot for Binance with a multi-indicator scoring engine, ATR-based SL/TP, Telegram bot control, and async architecture.',
    tags: ['Python', 'Binance API', 'Telegram Bot', 'pandas', 'APScheduler', 'aiosqlite'],
    github: 'https://github.com/deenqtt',
    status: 'in-progress',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'Strategy Research',
        description:
          'Studied scalping strategies, selected indicators: RSI, MACD, Bollinger Bands, StochRSI, and EMA200 as trend filter.',
        duration: '1 week',
      },
      {
        phase: 'Core Architecture',
        description:
          'Built async Python architecture with scanner, signal generator, order manager, and risk manager as separate modules.',
        duration: '1 week',
      },
      {
        phase: 'Signal Engine',
        description:
          'Implemented multi-indicator scoring system (max score 5) with ATR-based dynamic SL/TP and safety cap fallback to fixed percentage.',
        duration: '2 weeks',
      },
      {
        phase: 'Telegram Integration',
        description:
          'Built Telegram bot for real-time notifications, manual trade control, and status monitoring via chat commands.',
        duration: '1 week',
      },
      {
        phase: 'Reliability & Ops',
        description:
          'Added auto-fallback Binance endpoints (workaround ISP Indonesia), PID lock, dry run mode, scheduler, and structured logging.',
        duration: 'ongoing',
      },
    ],
  },
  {
    id: 'smartrack',
    title: 'SMARTRACK — Data Center Management Platform',
    description:
      'Full-stack DCIM platform for data center operators. Connects sensors, PDUs, UPS, servers, cooling, and access control into a single smart ecosystem with real-time MQTT/WebSocket monitoring, multi-protocol IoT (Modbus, SNMP), AI-powered analytics, drag-and-drop automation, energy tracking (PUE, carbon), and enterprise security (RBAC, AES-256, audit trail).',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'MQTT', 'Modbus', 'SNMP', 'WebSocket', 'Docker', 'RBAC', 'AI Analytics', 'Tailwind'],
    github: 'https://github.com/deenqtt/smartrack-software',
    demo: 'https://smartrack-software.vercel.app/',
    status: 'completed',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'Architecture & Data Model',
        description:
          'Designed multi-tenant schema with Prisma covering devices, sensors, alerts, access events, and energy records. Set up Next.js App Router with Docker-compose for local dev and production parity.',
        duration: '1 week',
      },
      {
        phase: 'IoT Protocol Integration',
        description:
          'Built real-time data ingestion pipeline supporting MQTT broker subscriptions, Modbus RTU/TCP polling, and SNMP v1/v2c/v3 queries. Normalized all protocol data into a unified device telemetry schema.',
        duration: '2 weeks',
      },
      {
        phase: 'AI Analytics & Automation Engine',
        description:
          'Implemented anomaly detection for sensor streams, cost and carbon emission prediction models, and a drag-and-drop rule chain editor for visual automation (condition → action triggers).',
        duration: '2 weeks',
      },
      {
        phase: 'Energy & Physical Security',
        description:
          'Built PUE dashboard with real-time power consumption, cost tracking, and carbon emission reporting. Integrated card-based access control, door lock management, and multi-level alarm system.',
        duration: '1 week',
      },
      {
        phase: 'Enterprise Security & Deployment',
        description:
          'Implemented RBAC with role-scoped permissions, AES-256 config encryption, and full audit trail logging. Deployed via Docker to Vercel with environment-based config management.',
        duration: '1 week',
      },
    ],
  },
  {
    id: 'portfolio-v1',
    title: 'Personal Portfolio v1',
    description:
      'This portfolio website — built with Next.js 14 App Router, TypeScript, Tailwind CSS, featuring live GitHub stats, WakaTime integration, and a guestbook.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Framer Motion'],
    github: 'https://github.com/deenqtt',
    status: 'in-progress',
    category: 'other',
    year: 2025,
    process: [
      {
        phase: 'Design System',
        description:
          'Defined dark techy theme, color palette (dark bg + cyan accent), typography, and component library.',
        duration: '2 days',
      },
      {
        phase: 'Core Architecture',
        description:
          'Set up Next.js 14 App Router, TypeScript strict mode, Tailwind config, folder structure.',
        duration: '1 day',
      },
      {
        phase: 'Data Layer',
        description:
          'Implemented GitHub API proxy with caching, Supabase integration for guestbook and web vitals.',
        duration: '2 days',
      },
      {
        phase: 'UI Development',
        description:
          'Built all pages with Framer Motion animations, Recharts for stats, responsive layouts.',
        duration: '1 week',
      },
    ],
  },
];
