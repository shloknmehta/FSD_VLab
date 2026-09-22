// Computer Networks Laboratory (Course Code: 216U01L502 / 216U01C502)
// Somaiya Vidyavihar University (SVU 2023 Detailed Syllabus)
// Premier Experiment 1: Virtual LANs (VLANs) & IEEE 802.1Q Trunking on Layer 2 Switches

export const CN_EXPERIMENTS = [
  {
    id: 1,
    slug: 'cn-vlan-switching',
    number: 1,
    title: 'Experiment 1: Virtual LANs (VLANs) & IEEE 802.1Q Trunking on Switches',
    shortTitle: 'VLANs & 802.1Q Trunking',
    code: '216U01L502.1',
    category: 'Switching, IEEE 802.1Q & Broadcast Isolation',
    estimatedTime: '45 Minutes',
    aim: 'To configure Virtual Local Area Networks (VLANs) on Layer 2 Cisco switches, segment broadcast domains, configure Access ports and 802.1Q Trunk links, and evaluate secure traffic isolation between academic departments (Faculty vs Students).',
    prerequisites: [
      'Layer 2 Ethernet switching and MAC address tables.',
      'Broadcast domains vs Collision domains in local networks.',
      'Basic Cisco IOS switch CLI configuration commands.',
    ],
    expectedOutcomes: [
      'Segment a physical switch into multiple logical broadcast domains (VLAN 10 Faculty, VLAN 20 Students).',
      'Assign switchports to specific VLAN access modes and verify port states.',
      'Configure IEEE 802.1Q trunking to multiplex traffic across inter-switch links.',
      'Verify Layer 2 broadcast containment and traffic isolation using ping tests.',
      'Diagnose why cross-VLAN traffic requires a Layer 3 routing mechanism (Router-on-a-Stick).',
    ],
    overview: {
      heading: 'Layer 2 Virtual LAN Architecture & 802.1Q Trunking',
      subheading: 'Broadcast Containment, Switch Port Modes, and IEEE 802.1Q Tagging',
      introduction: `In a traditional switched LAN, all connected computers share a single broadcast domain. A broadcast packet sent by one computer is received and processed by every single station on the switch. Virtual LANs (VLANs) logically partition a physical Layer 2 switch into multiple isolated virtual networks, providing security boundaries, reducing broadcast congestion, and grouping users by department regardless of physical location.`,
      rules: [
        'Access Ports: Connected to end hosts (PCs). Transmits standard untagged Ethernet frames. Frames belong strictly to the assigned VLAN.',
        'Trunk Ports: High-bandwidth links between switches or between switch and router. Multiplexes traffic from multiple VLANs across a single cable.',
        '802.1Q Header Tagging: Inserts a 4-byte tag into the standard Ethernet frame containing a 12-bit VLAN ID (supporting 4094 distinct VLANs).',
        'Native VLAN: Untagged frames traversing an 802.1Q trunk are automatically mapped to the Native VLAN (default VLAN 1 on Cisco hardware).',
        'Cross-VLAN Isolation: Devices on different VLANs cannot communicate at Layer 2. Inter-VLAN communication requires a Layer 3 router or multilayer switch.',
      ],
      tools: [
        {
          name: 'Access Port Mode',
          layer: 'Layer 2 (Data Link)',
          protocol: 'Untagged Ethernet (IEEE 802.3)',
          description: 'Carries traffic for a single VLAN. Strips 802.1Q tags upon frame transmission to end workstations.',
        },
        {
          name: 'Trunk Port Mode',
          layer: 'Layer 2 (Data Link)',
          protocol: 'IEEE 802.1Q Tagging',
          description: 'Inserts a 4-byte header (TPID 0x8100 + 12-bit VID) to transport multiple VLAN frames over a single physical link.',
        },
        {
          name: 'Cisco IOS CLI',
          layer: 'Switch Management',
          protocol: 'Cisco IOS Shell',
          description: 'Enables real-time port VLAN assignment and inspection using "switchport mode access" and "show vlan brief".',
        },
        {
          name: 'Ping Isolation Test',
          layer: 'Layer 3 Diagnostics',
          protocol: 'ICMP Echo',
          description: 'Verifies successful reachability within the same VLAN and proves dropped connectivity across different VLANs.',
        },
      ],
    },
    recap: {
      rules: [
        {
          title: 'VLAN Creation Syntax',
          text: 'Switch(config)# vlan 10 -> Switch(config-vlan)# name Faculty -> exit.',
        },
        {
          title: 'Access Port Assignment',
          text: 'Switch(config-if)# switchport mode access -> Switch(config-if)# switchport access vlan 10.',
        },
        {
          title: 'Trunk Port Configuration',
          text: 'Switch(config-if)# switchport mode trunk (enables 802.1Q frame multiplexing across switches).',
        },
        {
          title: 'Verification Command',
          text: "'show vlan brief' lists all configured VLANs, names, status (active), and assigned member ports.",
        },
      ],
      commands: [
        { cmd: 'Switch# configure terminal', purpose: 'Enter global configuration mode.' },
        { cmd: 'Switch(config)# vlan 10', purpose: 'Create VLAN 10.' },
        { cmd: 'Switch(config-vlan)# name Faculty_Staff', purpose: 'Assign descriptive name to VLAN 10.' },
        { cmd: 'Switch(config)# interface Fa0/1', purpose: 'Select FastEthernet port 0/1.' },
        { cmd: 'Switch(config-if)# switchport mode access', purpose: 'Set port to access mode for end device.' },
        { cmd: 'Switch(config-if)# switchport access vlan 10', purpose: 'Assign port Fa0/1 to VLAN 10.' },
        { cmd: 'Switch(config-if)# switchport mode trunk', purpose: 'Configure Gigabit uplink port as 802.1Q trunk.' },
        { cmd: 'Switch# show vlan brief', purpose: 'Display table of all VLANs and port assignments.' },
      ],
    },
    analysis: {
      headers: ['Dimension', 'Flat Network (VLAN 1 only)', 'VLAN-Segmented Network (VLAN 10, 20)'],
      rows: [
        ['Broadcast Domain Scope', 'Entire physical building (all ports flooded)', 'Confined strictly to members of the specific VLAN'],
        ['Security & Eavesdropping', 'Vulnerable to ARP spoofing & packet sniffing across departments', 'Logically isolated at Layer 2; traffic cannot cross without router firewall'],
        ['Broadcast Storms', 'Can saturate entire switch backplane and host CPUs', 'Contained to single department; zero impact on other departments'],
        ['Inter-Switch Cabling', 'Requires 1 physical cable per department', 'Single physical Trunk link carries all VLANs using 802.1Q tags'],
        ['Move/Add/Change Flexibility', 'Physical rewiring required in server rack', 'Reconfigure switch port VLAN assignment via CLI in seconds'],
      ],
    },
    references: [
      { title: 'IEEE 802.1Q Standard for Local and Metropolitan Area Networks: Bridges and Bridged Networks', url: 'https://standards.ieee.org' },
      { title: 'Cisco CCNA 200-301 Official Cert Guide: Implementing Ethernet VLANs', url: 'https://www.cisco.com' },
      { title: 'A.S. Tanenbaum, Computer Networks, 6th Edition, Pearson', url: 'https://www.pearson.com' },
      { title: 'B.A. Forouzan, Data Communications and Networking, 4th Edition, McGraw Hill', url: 'https://www.mheducation.com' },
    ],
  },
];
