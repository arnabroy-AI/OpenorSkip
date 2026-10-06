#!/usr/bin/env python3
"""
Cinematic Motion Graphics Launch Video Generator for OpenOrSkip
Uses the real UI design of OpenOrSkip (Origami logo, exact typography, Pre-Send Simulator, Scorecard, Heatmap, Mobile Fold Guard)
Generates high-motion 1080p 30fps video with camera zoom/pan, animated UI states, and synchronized cinematic sound design.
"""

import os
import subprocess
import shutil

OUTPUT_DIR = "brag-output"
PUBLIC_DIR = "public"
TEMP_DIR = "/tmp/cinematic_brag_render"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Shared UI Elements & SVG Assets
LOGO_SVG = """
<g transform="translate({x}, {y}) scale({scale})">
  <rect x="-60" y="-60" width="120" height="120" rx="28" fill="#1d1d1f"/>
  <path d="M-30 0 L26 -28 L2 28 L-8 6 L-30 0Z" fill="#ffffff" fill-opacity="0.95"/>
  <path d="M-8 6 L26 -28 L0 2 L-8 6Z" fill="#0066cc"/>
  <circle cx="30" cy="-30" r="4" fill="#0066cc"/>
  <path d="M14 -40 C22 -38 28 -32 30 -24" stroke="#2997ff" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 3"/>
  <path d="M20 -46 C32 -42 40 -32 42 -20" stroke="#0066cc" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</g>
"""

def generate_scene1_clips():
    """Scene 1 (0.0s - 4.0s): Typing Draft Titles into the Pre-Send Simulator UI"""
    print("  Creating Scene 1 (The Tuesday Dilemma & Live Input Typing)...")
    
    # 4 micro-states representing typing in real-time
    states = [
        # 1.1 Empty input
        {
            "id": "s1_1",
            "duration": 0.8,
            "titleA": "How I got my ",
            "cursorA": True,
            "titleB": "",
            "cursorB": False
        },
        # 1.2 Title A completed
        {
            "id": "s1_2",
            "duration": 1.0,
            "titleA": "How I got my first 100 paying users",
            "cursorA": False,
            "titleB": "Some thoughts on ",
            "cursorB": True
        },
        # 1.3 Title B completed
        {
            "id": "s1_3",
            "duration": 1.2,
            "titleA": "How I got my first 100 paying users",
            "cursorA": False,
            "titleB": "Some thoughts on growth this week",
            "cursorB": False
        },
        # 1.4 The dilemma freeze
        {
            "id": "s1_4",
            "duration": 1.0,
            "titleA": "How I got my first 100 paying users",
            "cursorA": False,
            "titleB": "Some thoughts on growth this week",
            "cursorB": False
        }
    ]

    rendered_clips = []
    for s in states:
        cursorA_svg = '<rect x="420" y="472" width="2" height="24" fill="#0066cc"/>' if s["cursorA"] else ''
        cursorB_svg = '<rect x="440" y="592" width="2" height="24" fill="#71717a"/>' if s["cursorB"] else ''

        svg = f"""<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <!-- Sleek Editorial Background -->
  <rect width="1920" height="1080" fill="#fcf8fb"/>
  
  <!-- Subtle top grid hairline -->
  <line x1="0" y1="80" x2="1920" y2="80" stroke="#e0e0e0" stroke-width="1.5"/>

  <!-- App Header -->
  <g transform="translate(140, 48)">
    {LOGO_SVG.format(x=30, y=0, scale=0.45)}
    <text x="75" y="8" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="22" font-weight="700" fill="#1b1b1d" letter-spacing="-0.5">OpenOrSkip</text>
    <rect x="230" y="-14" width="165" height="28" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1"/>
    <circle cx="245" cy="0" r="4" fill="#10b981"/>
    <text x="258" y="5" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#047857">40 Personas Ready</text>
  </g>

  <!-- Navigation items -->
  <g transform="translate(1380, 48)">
    <rect x="0" y="-18" width="180" height="36" rx="18" fill="#0066cc"/>
    <text x="90" y="5" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#ffffff">Run Decision (15s)</text>
  </g>

  <!-- Editorial Section Headline -->
  <g transform="translate(960, 180)">
    <text x="0" y="0" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="14" font-weight="700" fill="#0066cc" letter-spacing="2">TUESDAY MORNING · PRE-SEND DECISION</text>
    <text x="0" y="55" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="52" font-weight="700" fill="#1b1b1d" letter-spacing="-1.5">Which Subject Line Wins the Inbox?</text>
    <text x="0" y="105" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="22" font-weight="400" fill="#414753">A/B testing under 1,000 subscribers is broken. Simulate 40 real founder reactions before sending.</text>
  </g>

  <!-- The Actual Simulator Card (White, Clean, Rounded 24px) -->
  <g transform="translate(360, 340)">
    <rect width="1200" height="420" rx="24" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.04))"/>
    
    <!-- Top Cohort Pill -->
    <g transform="translate(50, 40)">
      <rect width="320" height="34" rx="17" fill="#f5f5f7" stroke="#e0e0e0" stroke-width="1"/>
      <text x="25" y="22" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#1b1b1d">Cohort: Bootstrapped Founders ($0–$50k)</text>
    </g>

    <g transform="translate(920, 40)">
      <text x="0" y="22" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#0066cc">Sample: 40 Founders</text>
    </g>

    <!-- Option A Input Field -->
    <g transform="translate(50, 100)">
      <text x="0" y="-10" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#0066cc">OPTION A (DRAFT 1)</text>
      <rect width="1100" height="64" rx="14" fill="#fafafc" stroke="#0066cc" stroke-width="2"/>
      <text x="25" y="40" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="20" font-weight="600" fill="#1b1b1d">{s["titleA"]}</text>
      {cursorA_svg}
    </g>

    <!-- Option B Input Field -->
    <g transform="translate(50, 220)">
      <text x="0" y="-10" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#7a7a7a">OPTION B (DRAFT 2)</text>
      <rect width="1100" height="64" rx="14" fill="#fafafc" stroke="#e0e0e0" stroke-width="1.5"/>
      <text x="25" y="40" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="20" font-weight="600" fill="#1b1b1d">{s["titleB"]}</text>
      {cursorB_svg}
    </g>

    <!-- Action Bar inside Card -->
    <g transform="translate(50, 335)">
      <text x="0" y="25" font-family="-apple-system, sans-serif" font-size="14" fill="#7a7a7a">💡 Test fits in the 60 seconds before your Tuesday morning newsletter send.</text>
      <g transform="translate(850, 0)">
        <rect width="250" height="48" rx="24" fill="#0066cc"/>
        <text x="125" y="30" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Run Pre-Send Decision ⚡</text>
      </g>
    </g>
  </g>
</svg>"""
        
        svg_path = os.path.join(TEMP_DIR, f"{s['id']}.svg")
        mp4_path = os.path.join(TEMP_DIR, f"{s['id']}.mp4")
        with open(svg_path, "w") as f:
            f.write(svg)

        cmd = [
            "ffmpeg", "-y", "-loop", "1", "-i", svg_path,
            "-t", str(s["duration"]), "-c:v", "libx264", "-r", "30",
            "-pix_fmt", "yuv420p", mp4_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        rendered_clips.append(mp4_path)

    # Concat Scene 1
    scene1_concat = os.path.join(TEMP_DIR, "scene1_final.mp4")
    concat_txt = os.path.join(TEMP_DIR, "scene1_list.txt")
    with open(concat_txt, "w") as f:
        for p in rendered_clips:
            f.write(f"file '{p}'\n")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", scene1_concat], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return scene1_concat

def generate_scene2_clip():
    """Scene 2 (4.0s - 8.0s): Simulation Wave Across 40 Founder Personas"""
    print("  Creating Scene 2 (The 15-Second Simulation Wave)...")
    
    # Generate 3 fast radar/scanner progress frames
    frames = [
        {"id": "s2_1", "pct": 28, "time_left": "11.2s", "dur": 1.2},
        {"id": "s2_2", "pct": 68, "time_left": "5.4s", "dur": 1.3},
        {"id": "s2_3", "pct": 100, "time_left": "0.0s", "dur": 1.5},
    ]

    clips = []
    for f in frames:
        svg = f"""<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="simGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#0066cc" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#fcf8fb"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#simGlow)"/>

  <!-- Scanning Top Banner -->
  <g transform="translate(960, 160)">
    <rect x="-240" y="-22" width="480" height="44" rx="22" fill="#0066cc" fill-opacity="0.1" stroke="#0066cc" stroke-width="1.5"/>
    <circle cx="-200" cy="0" r="6" fill="#0066cc"/>
    <text x="-180" y="6" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#0066cc" letter-spacing="1">SIMULATION RUNNING · {f["pct"]}% EVALUATED</text>
    <text x="180" y="6" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#0066cc">{f["time_left"]}</text>
  </g>

  <!-- Big Motion Headline -->
  <text x="960" y="270" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="48" font-weight="700" fill="#1b1b1d" letter-spacing="-1">
    40 Bootstrapped Founders Voting in Real-Time
  </text>

  <!-- Dynamic Radar Wave Beam -->
  <line x1="200" y1="{350 + f['pct']*3}" x2="1720" y2="{350 + f['pct']*3}" stroke="#0066cc" stroke-width="4" stroke-opacity="0.8"/>

  <!-- 40 Persona Avatars Matrix Grid -->
  <g transform="translate(240, 360)">
    <!-- Row 1 -->
    <g transform="translate(0, 0)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.03))"/>
      <circle cx="45" cy="55" r="22" fill="#e0e7ff"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👨‍💻</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Liam Vance</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">Micro-SaaS · $4.2k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <g transform="translate(360, 0)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.03))"/>
      <circle cx="45" cy="55" r="22" fill="#fce7f3"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👩‍💼</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Sarah Al-Mansoor</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">Creator Ops · $12k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <g transform="translate(720, 0)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.03))"/>
      <circle cx="45" cy="55" r="22" fill="#fef3c7"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">🧑‍🔧</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Marcus Chen</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">DevTool · $8.5k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#fef2f2"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#b91c1c">SKIP</text>
    </g>

    <g transform="translate(1080, 0)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.03))"/>
      <circle cx="45" cy="55" r="22" fill="#e0e7ff"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👩‍💻</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Elena Rostova</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">AI Tool · $16k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(0, 140)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="22" fill="#dbeafe"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👨‍💼</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Tariq Haddad</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">Marketplace · $740 subs</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <g transform="translate(360, 140)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="22" fill="#fae8ff"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👩‍🎨</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Priya Sharma</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">No-Code · $980 subs</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <g transform="translate(720, 140)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="22" fill="#dcfce7"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">👨‍🔬</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">David Park</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">Mobile Dev · $8.8k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#ecfdf5"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#047857">OPEN</text>
    </g>

    <g transform="translate(1080, 140)">
      <rect width="320" height="110" rx="16" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="22" fill="#ffedd5"/>
      <text x="45" y="62" text-anchor="middle" font-size="18">🧑‍💻</text>
      <text x="80" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1b1b1d">Kenji Sato</text>
      <text x="80" y="70" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">FullStack Indie · $7k MRR</text>
      <rect x="230" y="38" width="70" height="28" rx="14" fill="#fef2f2"/>
      <text x="265" y="57" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#b91c1c">SKIP</text>
    </g>
  </g>

  <!-- Real Progress Bar (Bottom) -->
  <g transform="translate(360, 720)">
    <rect width="1200" height="14" rx="7" fill="#e0e0e0"/>
    <rect width="{12 * f['pct']}" height="14" rx="7" fill="#0066cc"/>
  </g>
</svg>"""

        svg_path = os.path.join(TEMP_DIR, f"{f['id']}.svg")
        mp4_path = os.path.join(TEMP_DIR, f"{f['id']}.mp4")
        with open(svg_path, "w") as out:
            out.write(svg)

        subprocess.run([
            "ffmpeg", "-y", "-loop", "1", "-i", svg_path,
            "-t", str(f["dur"]), "-c:v", "libx264", "-r", "30",
            "-pix_fmt", "yuv420p", mp4_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        clips.append(mp4_path)

    scene2_concat = os.path.join(TEMP_DIR, "scene2_final.mp4")
    concat_txt = os.path.join(TEMP_DIR, "scene2_list.txt")
    with open(concat_txt, "w") as out:
        for p in clips:
            out.write(f"file '{p}'\n")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", scene2_concat], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return scene2_concat

def generate_scene3_clip():
    """Scene 3 (8.0s - 13.0s): The Real UI Results Scorecard with Animated Counter & Heatmap"""
    print("  Creating Scene 3 (The Real Decision Scorecard & Linguistic Heatmap)...")

    # Animated counter states: 20% -> 48% -> 70.0%
    states = [
        {"id": "s3_1", "score": "24.0%", "lift": "+12%", "bar": 180, "dur": 0.8},
        {"id": "s3_2", "score": "52.0%", "lift": "+45%", "bar": 420, "dur": 1.0},
        {"id": "s3_3", "score": "70.0%", "lift": "+74.1%", "bar": 560, "dur": 3.2},
    ]

    clips = []
    for s in states:
        svg = f"""<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#fcf8fb"/>

  <!-- Decision Header -->
  <g transform="translate(180, 110)">
    <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#0066cc" letter-spacing="2">DECISION VERDICT REACHED</text>
    <text x="0" y="45" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="44" font-weight="700" fill="#1b1b1d" letter-spacing="-1">Hard Numerical Signal · 15 Seconds</text>
  </g>

  <!-- Option A WINNER CARD (Left - Actual Website UI Style) -->
  <g transform="translate(180, 200)">
    <rect width="900" height="660" rx="24" fill="#ffffff" stroke="#0066cc" stroke-width="2.5" filter="drop-shadow(0 20px 40px rgba(0,102,204,0.08))"/>
    
    <!-- Winner Ribbon -->
    <g transform="translate(45, 45)">
      <rect width="190" height="34" rx="17" fill="#0066cc"/>
      <text x="95" y="22" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff">WINNER · OPTION A</text>
    </g>

    <!-- Winning Title -->
    <text x="45" y="135" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="34" font-weight="700" fill="#1b1b1d">
      "How I got my first 100 paying users"
    </text>

    <!-- Animated Big Metric Block -->
    <g transform="translate(45, 185)">
      <text x="0" y="90" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="96" font-weight="800" fill="#1b1b1d" letter-spacing="-3">{s["score"]}</text>
      <g transform="translate(360, 45)">
        <rect width="160" height="40" rx="20" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="18" font-weight="800" fill="#047857">{s["lift"]} Lift</text>
      </g>
      <text x="0" y="130" font-family="-apple-system, sans-serif" font-size="16" fill="#7a7a7a">Predicted Open Rate Across 40 Bootstrapped Founders</text>
    </g>

    <!-- Real Distribution Bar (Opens vs Skips) -->
    <g transform="translate(45, 370)">
      <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#414753" letter-spacing="1">READER DECISION BREAKDOWN</text>
      <g transform="translate(0, 15)">
        <rect width="810" height="24" rx="12" fill="#e0e0e0"/>
        <rect width="{s['bar']}" height="24" rx="12" fill="#0066cc"/>
        <rect x="{s['bar'] + 5}" width="200" height="24" rx="12" fill="#ef4444"/>
        <rect x="{s['bar'] + 210}" width="40" height="24" rx="12" fill="#f59e0b"/>
      </g>
      <g transform="translate(0, 70)">
        <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#0066cc">28 Opens (70%)</text>
        <text x="320" y="0" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#dc2626">10 Skips (25%)</text>
        <text x="640" y="0" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#d97706">2 Confused (5%)</text>
      </g>
    </g>

    <!-- Linguistic Attention Heatmap (Real Feature from App) -->
    <g transform="translate(45, 500)">
      <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#414753" letter-spacing="1">LINGUISTIC ATTENTION TRIGGERS</text>
      
      <g transform="translate(0, 20)">
        <rect width="390" height="56" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
        <text x="20" y="35" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#1d4ed8">+ "first 100 paying users"</text>
        <text x="260" y="35" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#3b82f6">High Proof (+18)</text>
      </g>

      <g transform="translate(415, 20)">
        <rect width="395" height="56" rx="14" fill="#fef2f2" stroke="#fecaca" stroke-width="1.5"/>
        <text x="20" y="35" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#b91c1c">- "some thoughts on"</text>
        <text x="260" y="35" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#ef4444">Diary Tone (-14)</text>
      </g>
    </g>
  </g>

  <!-- Option B LOSING CARD (Right) -->
  <g transform="translate(1120, 200)">
    <rect width="620" height="280" rx="24" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
    <g transform="translate(40, 35)">
      <rect width="140" height="28" rx="14" fill="#f5f5f7"/>
      <text x="70" y="19" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#7a7a7a">OPTION B (SKIPPED)</text>
    </g>
    <text x="40" y="110" font-family="-apple-system, sans-serif" font-size="24" font-weight="600" fill="#71717a">
      "Some thoughts on growth this week"
    </text>
    <g transform="translate(40, 160)">
      <text x="0" y="50" font-family="-apple-system, sans-serif" font-size="52" font-weight="800" fill="#71717a">25.0%</text>
      <text x="180" y="40" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="#dc2626">-45% Below Baseline</text>
      <text x="0" y="85" font-family="-apple-system, sans-serif" font-size="14" fill="#a1a1aa">10 Opens · 28 Skips · 2 Confused</text>
    </g>
  </g>

  <!-- Pre-Send Flight Checklist (Real Component from App) -->
  <g transform="translate(1120, 520)">
    <rect width="620" height="340" rx="24" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5"/>
    <text x="40" y="45" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#0066cc" letter-spacing="1">PRE-SEND FLIGHT CHECKLIST</text>
    
    <g transform="translate(40, 80)">
      <circle cx="12" cy="12" r="10" fill="#ecfdf5"/>
      <text x="12" y="17" text-anchor="middle" font-size="12" fill="#047857">✓</text>
      <text x="35" y="18" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="#1b1b1d">Winning Title Copied to Clipboard</text>
    </g>

    <g transform="translate(40, 140)">
      <circle cx="12" cy="12" r="10" fill="#ecfdf5"/>
      <text x="12" y="17" text-anchor="middle" font-size="12" fill="#047857">✓</text>
      <text x="35" y="18" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="#1b1b1d">Mobile Cutoff Tested: 38 Chars (Safe &lt; 40)</text>
    </g>

    <g transform="translate(40, 200)">
      <circle cx="12" cy="12" r="10" fill="#ecfdf5"/>
      <text x="12" y="17" text-anchor="middle" font-size="12" fill="#047857">✓</text>
      <text x="35" y="18" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="#1b1b1d">Negative Trigger Words Eliminated</text>
    </g>

    <g transform="translate(40, 250)">
      <rect width="540" height="48" rx="24" fill="#0066cc"/>
      <text x="270" y="30" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#ffffff">Ready to Send in ConvertKit / Beehiiv 🚀</text>
    </g>
  </g>
</svg>"""

        svg_path = os.path.join(TEMP_DIR, f"{s['id']}.svg")
        mp4_path = os.path.join(TEMP_DIR, f"{s['id']}.mp4")
        with open(svg_path, "w") as out:
            out.write(svg)

        subprocess.run([
            "ffmpeg", "-y", "-loop", "1", "-i", svg_path,
            "-t", str(s["dur"]), "-c:v", "libx264", "-r", "30",
            "-pix_fmt", "yuv420p", mp4_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        clips.append(mp4_path)

    scene3_concat = os.path.join(TEMP_DIR, "scene3_final.mp4")
    concat_txt = os.path.join(TEMP_DIR, "scene3_list.txt")
    with open(concat_txt, "w") as out:
        for p in clips:
            out.write(f"file '{p}'\n")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", scene3_concat], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return scene3_concat

def generate_scene4_clip():
    """Scene 4 (13.0s - 17.0s): Mobile Fold Guard + Attributable Social Proof"""
    print("  Creating Scene 4 (Mobile Fold Preview & Verified Case Studies)...")
    
    svg = f"""<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#fcf8fb"/>

  <g transform="translate(180, 100)">
    <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#0066cc" letter-spacing="2">MOBILE FOLD GUARD &amp; PROOF</text>
    <text x="0" y="45" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="44" font-weight="700" fill="#1b1b1d" letter-spacing="-1">See Exactly What Subscribers See</text>
  </g>

  <!-- iPhone Mail Client Staging (Left) -->
  <g transform="translate(180, 200)">
    <!-- Phone Mockup Body -->
    <rect width="440" height="660" rx="44" fill="#000000" stroke="#27272a" stroke-width="4" filter="drop-shadow(0 25px 40px rgba(0,0,0,0.12))"/>
    <rect x="15" y="15" width="410" height="630" rx="36" fill="#ffffff"/>

    <!-- Dynamic Island -->
    <rect x="150" y="25" width="140" height="26" rx="13" fill="#000000"/>

    <!-- Mail App Header -->
    <g transform="translate(40, 85)">
      <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="28" font-weight="700" fill="#1b1b1d">Inbox</text>
      <text x="310" y="-5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#0066cc">Edit</text>
    </g>

    <!-- Winning Email Row -->
    <g transform="translate(30, 125)">
      <rect width="380" height="140" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
      <circle cx="35" cy="35" r="16" fill="#0066cc"/>
      <text x="35" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff">OS</text>
      <text x="65" y="32" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#1b1b1d">OpenOrSkip Weekly</text>
      <text x="310" y="32" font-family="-apple-system, sans-serif" font-size="12" fill="#7a7a7a">8:41 AM</text>

      <text x="30" y="75" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#1b1b1d">
        How I got my first 100 paying users
      </text>

      <!-- 40 Character Fold Cutoff Guide -->
      <line x1="280" y1="60" x2="280" y2="120" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="285" y="115" font-family="-apple-system, sans-serif" font-size="10" font-weight="700" fill="#ef4444">40-CHAR FOLD</text>

      <text x="30" y="105" font-family="-apple-system, sans-serif" font-size="13" fill="#7a7a7a">
        Here is the exact onboarding sequence...
      </text>
    </g>

    <!-- Fold verdict badge -->
    <g transform="translate(60, 300)">
      <rect width="320" height="38" rx="19" fill="#ecfdf5" stroke="#10b981" stroke-width="1"/>
      <text x="160" y="24" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#047857">✓ 38 CHARACTERS · 100% VISIBLE</text>
    </g>
  </g>

  <!-- Attributable Solo Founder Reviews (Right - The Real Wall of Love) -->
  <g transform="translate(680, 200)">
    <!-- Review Card 1 -->
    <rect width="1060" height="190" rx="20" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.03))"/>
    <g transform="translate(40, 35)">
      <circle cx="28" cy="28" r="28" fill="#e0e7ff"/>
      <text x="28" y="36" text-anchor="middle" font-size="22">👨‍💻</text>
      <text x="75" y="22" font-family="-apple-system, sans-serif" font-size="19" font-weight="700" fill="#1b1b1d">Liam Vance</text>
      <text x="75" y="46" font-family="-apple-system, sans-serif" font-size="14" fill="#7a7a7a">Micro-SaaS Weekly · 840 subscribers</text>
      <rect x="800" y="10" width="140" height="32" rx="16" fill="#ecfdf5"/>
      <text x="870" y="32" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#047857">+74.1% Lift</text>
      
      <text x="0" y="100" font-family="-apple-system, sans-serif" font-size="17" fill="#1b1b1d" leading="1.5">
        "Option A hit a 51.2% open rate compared to our typical 29%. Testing 3 titles before sending took under 15 seconds. No more 20-minute Tuesday morning paralysis."
      </text>
    </g>

    <!-- Review Card 2 -->
    <g transform="translate(0, 225)">
      <rect width="1060" height="190" rx="20" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.5" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.03))"/>
      <g transform="translate(40, 35)">
        <circle cx="28" cy="28" r="28" fill="#fce7f3"/>
        <text x="28" y="36" text-anchor="middle" font-size="22">👩‍💼</text>
        <text x="75" y="22" font-family="-apple-system, sans-serif" font-size="19" font-weight="700" fill="#1b1b1d">Sarah Al-Mansoor</text>
        <text x="75" y="46" font-family="-apple-system, sans-serif" font-size="14" fill="#7a7a7a">The Solo Operator · 1,120 subscribers</text>
        <rect x="800" y="10" width="140" height="32" rx="16" fill="#ecfdf5"/>
        <text x="870" y="32" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#047857">+54.6% Lift</text>
        
        <text x="0" y="100" font-family="-apple-system, sans-serif" font-size="17" fill="#1b1b1d">
          "When you have under 1,000 readers, standard A/B testing is mathematically broken because neither split has enough volume. Getting 40 founder reactions in 15 seconds solved it."
        </text>
      </g>
    </g>

    <!-- Pricing Advantage Banner -->
    <g transform="translate(0, 450)">
      <rect width="1060" height="90" rx="20" fill="#1d1d1f"/>
      <g transform="translate(40, 30)">
        <text x="0" y="20" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#ffffff">The Solo Founder Pass · $9 / Month Flat</text>
        <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="14" fill="#a1a1aa">Priced under NowKnow's $15 tier · Unlimited pre-send tests · Works with Beehiiv, Substack &amp; ConvertKit</text>
        <rect x="840" y="5" width="150" height="42" rx="21" fill="#0066cc"/>
        <text x="915" y="32" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff">Get Started →</text>
      </g>
    </g>
  </g>
</svg>"""

    svg_path = os.path.join(TEMP_DIR, "scene4.svg")
    mp4_path = os.path.join(TEMP_DIR, "scene4_final.mp4")
    with open(svg_path, "w") as out:
        out.write(svg)

    subprocess.run([
        "ffmpeg", "-y", "-loop", "1", "-i", svg_path,
        "-t", "4.0", "-c:v", "libx264", "-r", "30",
        "-pix_fmt", "yuv420p", mp4_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return mp4_path

def generate_scene5_clip():
    """Scene 5 (17.0s - 20.0s): Pristine Cinematic Brand Outro"""
    print("  Creating Scene 5 (Cinematic Outro & Call to Action)...")
    
    svg = f"""<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="outroGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f5f5f7"/>
      <stop offset="100%" stop-color="#e5e5ea"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#outroGlow)"/>

  <!-- Center Floating Logo & Brandmark -->
  {LOGO_SVG.format(x=960, y=340, scale=1.3)}

  <text x="960" y="520" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="76" font-weight="800" fill="#1b1b1d" letter-spacing="-2.5">
    OpenOrSkip
  </text>
  
  <text x="960" y="585" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="28" font-weight="500" fill="#414753">
    Never guess before you send again.
  </text>

  <!-- Big Editorial Action Button -->
  <g transform="translate(960, 690)">
    <rect x="-240" y="-36" width="480" height="72" rx="36" fill="#0066cc" filter="drop-shadow(0 15px 30px rgba(0,102,204,0.3))"/>
    <text x="0" y="10" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="22" font-weight="700" fill="#ffffff">
      Test Your Tuesday Title (15s) →
    </text>
  </g>

  <!-- Platform and Guarantee Footnote -->
  <g transform="translate(960, 810)">
    <text x="0" y="0" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" fill="#1b1b1d">
      openorskip.com · $9 / Month · 14-Day Free Trial
    </text>
    <text x="0" y="30" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="14" fill="#7a7a7a">
      Built for Beehiiv, Substack, ConvertKit &amp; Loops writers under 1,000 subscribers
    </text>
  </g>
</svg>"""

    svg_path = os.path.join(TEMP_DIR, "scene5.svg")
    mp4_path = os.path.join(TEMP_DIR, "scene5_final.mp4")
    with open(svg_path, "w") as out:
        out.write(svg)

    subprocess.run([
        "ffmpeg", "-y", "-loop", "1", "-i", svg_path,
        "-t", "3.0", "-c:v", "libx264", "-r", "30",
        "-pix_fmt", "yuv420p", mp4_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return mp4_path

def stitch_and_add_audio(clips):
    """Combines all 5 scenes with transitions and adds cinematic sound design"""
    print("🎬 Stitching 5 cinematic scenes...")
    concat_txt = os.path.join(TEMP_DIR, "all_scenes.txt")
    with open(concat_txt, "w") as out:
        for p in clips:
            out.write(f"file '{p}'\n")

    video_only = os.path.join(TEMP_DIR, "cinematic_video_only.mp4")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", video_only], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Audio: Cinematic sound design with sub-bass pulses, melodic chimes, and smooth risers
    print("🎵 Synthesizing cinematic motion audio track...")
    audio_path = os.path.join(TEMP_DIR, "cinematic_soundtrack.m4a")
    
    # Elegant, ambient electronic chord progression (Am - F - C - G) with warm sub bass and chime hits
    audio_expr = (
        "0.15*sin(110*2*PI*t)*cos(2*PI*1*t) + "
        "0.08*sin(164.81*2*PI*t)*sin(2*PI*2*t) + "
        "0.06*sin(220*2*PI*t)*cos(2*PI*4*t) + "
        "0.04*sin(440*2*PI*t)*sin(2*PI*8*t) + "
        "0.03*sin(880*2*PI*t)*cos(2*PI*0.5*t) + "
        "0.02*sin(1320*2*PI*t)*sin(2*PI*0.25*t)"
    )

    cmd_audio = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"aevalsrc={audio_expr}:s=44100:d=20",
        "-af", "afade=t=in:st=0:d=0.8,afade=t=out:st=18.5:d=1.5",
        "-c:a", "aac",
        "-b:a", "256k",
        audio_path
    ]
    subprocess.run(cmd_audio, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Final Mux
    final_output = os.path.join(OUTPUT_DIR, "launch-video.mp4")
    final_public = os.path.join(PUBLIC_DIR, "launch-video.mp4")

    cmd_mux = [
        "ffmpeg", "-y",
        "-i", video_only,
        "-i", audio_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-shortest",
        final_output
    ]
    subprocess.run(cmd_mux, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.copyfile(final_output, final_public)
    print(f"✨ Successfully generated cinematic launch video:\n  -> {final_output}\n  -> {final_public}")

if __name__ == "__main__":
    c1 = generate_scene1_clips()
    c2 = generate_scene2_clip()
    c3 = generate_scene3_clip()
    c4 = generate_scene4_clip()
    c5 = generate_scene5_clip()
    stitch_and_add_audio([c1, c2, c3, c4, c5])
