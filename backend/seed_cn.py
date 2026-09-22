import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vlab_core.settings')
django.setup()

from experiments.models import Experiment, QuizQuestion

def seed_cn():
    print("=== SEEDING COMPUTER NETWORKS (CN) — PREMIER EXPERIMENT 1 ===")

    # Delete previous CN experiments to keep strictly 1 experiment as requested
    Experiment.objects.filter(subject="CN").delete()

    vlan_experiment = {
        "subject": "CN",
        "experiment_number": 1,
        "slug": "cn-vlan-switching",
        "title": "Experiment 1: Virtual LANs (VLANs) and IEEE 802.1Q Trunking on Switches",
        "aim": "To configure Virtual Local Area Networks (VLANs) on Layer 2 Cisco switches, segment broadcast domains, configure Access ports and 802.1Q Trunk links, and evaluate secure traffic isolation between academic departments (Faculty vs Students).",
        "overview": (
            "A Local Area Network (LAN) connected by Layer 2 switches shares a single broadcast domain. When any device broadcasts an ARP request, "
            "every connected station on the switch processes that frame, leading to bandwidth congestion and security vulnerabilities. "
            "Virtual LANs (VLANs) logically partition a physical switch into multiple isolated broadcast domains:\n\n"
            "1. Broadcast Domain Segmentation: Devices in different VLANs cannot communicate at Layer 2, even if connected to the same physical switch. Inter-VLAN communication requires a Layer 3 router or multilayer switch.\n"
            "2. Switch Port Modes:\n"
            "   - Access Port: Assigned to a single VLAN. Carries standard untagged Ethernet frames. Used for end-user workstations (PCs, laptops, printers).\n"
            "   - Trunk Port: Carries traffic for multiple VLANs across a single physical link between switches or between a switch and a router.\n"
            "3. IEEE 802.1Q Tagging: Trunk links insert a 4-byte VLAN tag into standard Ethernet frames. The tag contains a 12-bit VLAN Identifier (VID), supporting up to 4094 distinct VLANs.\n"
            "4. Native VLAN: Untagged frames passing through an 802.1Q trunk port are mapped to the Native VLAN (default VLAN 1 on Cisco hardware).\n"
            "5. Institutional Security: Segmenting students (VLAN 20) and faculty/examination branch (VLAN 10) prevents unauthorized packet sniffing and broadcast storms."
        ),
        "recap": (
            "Cisco IOS VLAN Configuration Commands & Rules:\n"
            "• Create VLAN: 'Switch(config)# vlan 10' -> 'Switch(config-vlan)# name Faculty_Staff'.\n"
            "• Assign Access Port: 'Switch(config-if)# switchport mode access' -> 'Switch(config-if)# switchport access vlan 10'.\n"
            "• Configure Trunk Port: 'Switch(config-if)# switchport mode trunk' (multiplexes multiple VLANs via 802.1Q tags).\n"
            "• Verification: 'show vlan brief' displays active VLANs and their assigned ports.\n"
            "• Trunk Verification: 'show interfaces trunk' displays trunking encapsulation and allowed VLANs."
        ),
        "analysis": (
            "Flat Switched Network vs VLAN-Segmented Network Comparison:\n"
            "| Dimension | Flat Switched LAN (VLAN 1 only) | VLAN-Segmented Network (VLAN 10, 20) |\n"
            "|---|---|---|\n"
            "| Broadcast Scope | Entire physical building / all switchports | Confined strictly to members of the specific VLAN |\n"
            "| Security & Isolation | Vulnerable to ARP spoofing & packet sniffing | Strong Layer 2 boundary; isolated from other VLANs |\n"
            "| Bandwidth Efficiency | High overhead from broadcast storms | Preserves switch backplane & host CPU cycles |\n"
            "| Link Utilization | Requires separate physical cable per department | Single Trunk link multiplexes traffic via 802.1Q tags |\n"
            "| Move/Add/Change Cost | Physical re-cabling needed in server room | Reassign switch port logically via CLI in seconds |"
        ),
        "references": (
            "• IEEE 802.1Q Standard for Local and Metropolitan Area Networks: Bridges and Bridged Networks\n"
            "• Cisco CCNA 200-301 Official Cert Guide: Implementing Ethernet VLANs\n"
            "• A.S. Tanenbaum, Computer Networks, 6th Edition, Pearson\n"
            "• B.A. Forouzan, Data Communications and Networking, 4th Edition, McGraw Hill"
        ),
        "estimated_time": "45 Minutes",
        "pretest": [
            {
                "question_text": "What is the primary architectural purpose of configuring VLANs on an enterprise switch?",
                "options_json": [
                    "To divide a single physical switch into multiple isolated broadcast domains",
                    "To increase the optical speed of the Ethernet cables",
                    "To assign public IP addresses to every PC",
                    "To eliminate the need for network interface cards"
                ],
                "correct_answer": "To divide a single physical switch into multiple isolated broadcast domains",
                "explanation": "VLANs logically segment a physical Layer 2 switch into independent broadcast domains, improving security, organization, and network efficiency.",
                "order": 1
            },
            {
                "question_text": "What type of frame does an Access port deliver to an end-user workstation?",
                "options_json": [
                    "Standard untagged Ethernet frame",
                    "802.1Q tagged frame with 4-byte header",
                    "Encrypted IPsec tunnel frame",
                    "Token Ring frame"
                ],
                "correct_answer": "Standard untagged Ethernet frame",
                "explanation": "Access ports strip the 802.1Q VLAN tag before delivering frames to standard PC network adapters, which do not understand VLAN tagging.",
                "order": 2
            },
            {
                "question_text": "What is the size of the IEEE 802.1Q VLAN tag inserted into an Ethernet frame?",
                "options_json": ["4 bytes (32 bits)", "2 bytes (16 bits)", "8 bytes (64 bits)", "1 byte (8 bits)"],
                "correct_answer": "4 bytes (32 bits)",
                "explanation": "The IEEE 802.1Q standard inserts a 4-byte (32-bit) tag into the Ethernet header, containing a 2-byte Tag Protocol Identifier (0x8100) and a 2-byte Tag Control Information (including 12-bit VLAN ID).",
                "order": 3
            },
            {
                "question_text": "Can PC1 in VLAN 10 ping PC2 in VLAN 20 if both are plugged into the same Layer 2 switch without a router?",
                "options_json": [
                    "No, because Layer 2 switches isolate broadcast and unicast traffic between different VLANs",
                    "Yes, because both devices share the same physical switch backplane",
                    "Yes, provided both PCs have the same subnet mask",
                    "Yes, if they use the ping -t option"
                ],
                "correct_answer": "No, because Layer 2 switches isolate broadcast and unicast traffic between different VLANs",
                "explanation": "Different VLANs represent completely isolated Layer 2 domains. To communicate across VLANs, a Layer 3 routing mechanism (Router-on-a-Stick or L3 switch) is mandatory.",
                "order": 4
            },
            {
                "question_text": "Which Cisco IOS command displays a concise table of configured VLANs and their assigned switch ports?",
                "options_json": ["show vlan brief", "show ip route", "show arp", "show interfaces status"],
                "correct_answer": "show vlan brief",
                "explanation": "The command 'show vlan brief' displays VLAN numbers, VLAN names, status (active), and all member switch ports.",
                "order": 5
            }
        ],
        "posttest": [
            {
                "question_text": "What happens to untagged frames received on an 802.1Q trunk port?",
                "options_json": [
                    "They are assigned to the Native VLAN (default VLAN 1)",
                    "They are immediately discarded and reported as CRC errors",
                    "They are broadcasted across all VLANs simultaneously",
                    "They are forwarded to the console port"
                ],
                "correct_answer": "They are assigned to the Native VLAN (default VLAN 1)",
                "explanation": "The 802.1Q specification defines a Native VLAN (default VLAN 1 on Cisco hardware). Any untagged frame arriving on a trunk port is treated as belonging to the Native VLAN.",
                "order": 1
            },
            {
                "question_text": "What is the theoretical maximum number of VLANs supported by the 12-bit VLAN Identifier in 802.1Q?",
                "options_json": ["4096 (0 to 4095)", "256", "1024", "65536"],
                "correct_answer": "4096 (0 to 4095)",
                "explanation": "A 12-bit field provides 2^12 = 4096 unique values (VLAN IDs 0 and 4095 are reserved, providing usable VLAN range 1 to 4094).",
                "order": 2
            },
            {
                "question_text": "In a university network, why should the Examination Branch and Student Labs reside on separate VLANs?",
                "options_json": [
                    "To prevent students from capturing sensitive exam packets and isolate broadcast storms",
                    "Because switches can only support up to 10 computers per LAN",
                    "Because students use Linux and faculty use Windows",
                    "To avoid paying dual IP license fees"
                ],
                "correct_answer": "To prevent students from capturing sensitive exam packets and isolate broadcast storms",
                "explanation": "VLAN separation creates an enforced security perimeter preventing unauthorized packet sniffing, spoofing, and broadcast interference between user groups.",
                "order": 3
            },
            {
                "question_text": "Which Cisco IOS command configures a port to multiplex traffic for multiple VLANs across an inter-switch link?",
                "options_json": ["switchport mode trunk", "switchport mode access", "switchport access vlan all", "ip route 0.0.0.0 0.0.0.0"],
                "correct_answer": "switchport mode trunk",
                "explanation": "The command 'switchport mode trunk' sets the interface into permanent trunking mode, allowing it to tag and forward frames for multiple VLANs.",
                "order": 4
            },
            {
                "question_text": "What architecture is required to route packets between VLAN 10 and VLAN 20 using a single router physical interface?",
                "options_json": [
                    "Router-on-a-Stick using 802.1Q sub-interfaces",
                    "A hub connected between the router and switch",
                    "Two straight-through cables connected to the same switch port",
                    "Assigning two default gateways to each computer"
                ],
                "correct_answer": "Router-on-a-Stick using 802.1Q sub-interfaces",
                "explanation": "Router-on-a-Stick configures logical sub-interfaces (e.g., G0/0.10, G0/0.20) on a single physical router port connected to a trunk link, tagging and routing packets between VLANs.",
                "order": 5
            }
        ]
    }

    exp = Experiment.objects.create(
        subject=vlan_experiment["subject"],
        experiment_number=vlan_experiment["experiment_number"],
        slug=vlan_experiment["slug"],
        title=vlan_experiment["title"],
        aim=vlan_experiment["aim"],
        overview=vlan_experiment["overview"],
        recap=vlan_experiment["recap"],
        analysis=vlan_experiment["analysis"],
        references=vlan_experiment["references"],
        estimated_time=vlan_experiment["estimated_time"],
    )

    for q in vlan_experiment["pretest"]:
        QuizQuestion.objects.create(
            experiment=exp,
            quiz_type="PRETEST",
            question_text=q["question_text"],
            options_json=q["options_json"],
            correct_answer=q["correct_answer"],
            explanation=q["explanation"],
            order=q["order"]
        )

    for q in vlan_experiment["posttest"]:
        QuizQuestion.objects.create(
            experiment=exp,
            quiz_type="POSTTEST",
            question_text=q["question_text"],
            options_json=q["options_json"],
            correct_answer=q["correct_answer"],
            explanation=q["explanation"],
            order=q["order"]
        )

    print(f"[CN Exp 1] {exp.title} seeded successfully with {len(vlan_experiment['pretest'])} Pretest & {len(vlan_experiment['posttest'])} Posttest questions.")
    print("=== COMPUTER NETWORKS (1 PREMIER EXPERIMENT) SEEDED SUCCESSFULLY ===")

if __name__ == '__main__':
    import django
    django.setup()
    seed_cn()
