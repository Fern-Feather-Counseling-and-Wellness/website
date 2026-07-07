#!/usr/bin/env python3
"""Generate the Fern & Feather Anxiety Toolkit PDF - 12 wallet-sized coping skill cards."""

import math
import os
from fpdf import FPDF

SAGE_700 = (74, 103, 65)
SAGE_500 = (107, 142, 96)
SAGE_50 = (240, 244, 238)
CREAM = (250, 247, 242)
DARK = (43, 43, 43)
WHITE = (255, 255, 255)

BRAND = "Fern & Feather Counseling and Wellness"
WEBSITE = "fernandfeathercounseling.com"

SKILLS = [
    {"name": "4-7-8 Breathing", "tag": "Breathing", "steps": [
        "Inhale through your nose for 4 seconds",
        "Hold your breath for 7 seconds",
        "Exhale through your mouth for 8 seconds",
        "Repeat 4 cycles",
    ]},
    {"name": "5-4-3-2-1 Grounding", "tag": "Grounding", "steps": [
        "5 things you can SEE",
        "4 things you can HEAR",
        "3 things you can TOUCH",
        "2 things you can SMELL",
        "1 thing you can TASTE",
    ]},
    {"name": "Box Breathing", "tag": "Breathing", "steps": [
        "Inhale for 4 seconds",
        "Hold for 4 seconds",
        "Exhale for 4 seconds",
        "Hold empty for 4 seconds",
        "Repeat 4 times",
    ]},
    {"name": "Body Scan", "tag": "Awareness", "steps": [
        "Start at your toes, move upward",
        "Notice each body part in turn",
        "Observe sensations without judgment",
        "End at the top of your head",
    ]},
    {"name": "Muscle Relaxation", "tag": "Relaxation", "steps": [
        "Squeeze one muscle group tight",
        "Hold for 5 seconds, then release",
        "Work from feet to forehead",
        "Let tension melt away",
    ]},
    {"name": "Cold Water Reset", "tag": "Nervous System", "steps": [
        "Splash cold water on your face",
        "Or hold an ice cube in your hand",
        "Activates the parasympathetic system",
        "Brings calm in 30-60 seconds",
    ]},
    {"name": "Safe Place Visualization", "tag": "Imagery", "steps": [
        "Picture a place where you feel safe",
        "Engage all five senses",
        "What do you see, hear, smell, feel?",
        "Stay here for 2-3 minutes",
    ]},
    {"name": "Self-Compassion Break", "tag": "Self-Care", "steps": [
        'Name it: "This is hard right now"',
        'Normalize: "I am not alone in this"',
        'Be kind: "May I be gentle with myself"',
        "Rest a hand over your heart, breathe",
    ]},
    {"name": "Opposite Action", "tag": "DBT Skill", "steps": [
        "Notice what your emotion urges",
        "Do the OPPOSITE with intention",
        "Anxious? Reach out to someone",
        "Depressed? Get moving gently",
    ]},
    {"name": "Sigh Breath", "tag": "Quick Reset", "steps": [
        "Take a deep inhale through nose",
        "Take one more sip of air on top",
        "Exhale slowly through your mouth",
        "Drop your shoulders. Repeat x3",
    ]},
    {"name": "Label the Thought", "tag": "Defusion", "steps": [
        "Notice a distressing thought",
        'Add: "I am having the thought that..."',
        "Creates distance - you are not your thoughts",
        "Let the thought pass like a cloud",
    ]},
    {"name": "Butterfly Hug", "tag": "Somatic", "steps": [
        "Cross your arms over your chest",
        "Tap alternately: left, right, left",
        "Like butterfly wings on your heart",
        "Breathe slowly. Calms the nervous system",
    ]},
]


# ---------------------------------------------------------------------------
# Rounded-rectangle helpers
# ---------------------------------------------------------------------------

def fill_rounded_rect(pdf, x, y, w, h, r):
    """Fill a rounded rectangle (all four corners)."""
    pdf.rect(x, y + r, w, h - 2 * r, "F")
    pdf.rect(x + r, y, w - 2 * r, r, "F")
    pdf.rect(x + r, y + h - r, w - 2 * r, r, "F")
    pdf.circle(x + r, y + r, r, "F")
    pdf.circle(x + w - r, y + r, r, "F")
    pdf.circle(x + r, y + h - r, r, "F")
    pdf.circle(x + w - r, y + h - r, r, "F")


def draw_rounded_border(pdf, x, y, w, h, r):
    """Draw the outline of a rounded rectangle (all four corners)."""
    steps = 12

    # straight edges
    pdf.line(x + r, y, x + w - r, y)
    pdf.line(x + r, y + h, x + w - r, y + h)
    pdf.line(x, y + r, x, y + h - r)
    pdf.line(x + w, y + r, x + w, y + h - r)

    # TL: 180 -> 270
    for i in range(steps):
        a1 = math.radians(180 + 90 * i / steps)
        a2 = math.radians(180 + 90 * (i + 1) / steps)
        pdf.line(
            x + r + r * math.cos(a1), y + r + r * math.sin(a1),
            x + r + r * math.cos(a2), y + r + r * math.sin(a2),
        )
    # TR: 270 -> 360
    for i in range(steps):
        a1 = math.radians(270 + 90 * i / steps)
        a2 = math.radians(270 + 90 * (i + 1) / steps)
        pdf.line(
            x + w - r + r * math.cos(a1), y + r + r * math.sin(a1),
            x + w - r + r * math.cos(a2), y + r + r * math.sin(a2),
        )
    # BR: 0 -> 90
    for i in range(steps):
        a1 = math.radians(90 * i / steps)
        a2 = math.radians(90 * (i + 1) / steps)
        pdf.line(
            x + w - r + r * math.cos(a1), y + h - r + r * math.sin(a1),
            x + w - r + r * math.cos(a2), y + h - r + r * math.sin(a2),
        )
    # BL: 90 -> 180
    for i in range(steps):
        a1 = math.radians(90 + 90 * i / steps)
        a2 = math.radians(90 + 90 * (i + 1) / steps)
        pdf.line(
            x + r + r * math.cos(a1), y + h - r + r * math.sin(a1),
            x + r + r * math.cos(a2), y + h - r + r * math.sin(a2),
        )


def fill_rounded_bar(pdf, x, y, w, h, r):
    """Fill a bar with rounded top corners and flat bottom."""
    pdf.rect(x, y + r, w, h - r, "F")
    pdf.rect(x + r, y, w - 2 * r, r, "F")
    # top-left corner fill
    pdf.circle(x + r, y + r, r, "F")
    # top-right corner fill
    pdf.circle(x + w - r, y + r, r, "F")


# ---------------------------------------------------------------------------
# Build PDF
# ---------------------------------------------------------------------------

def make_pdf(out_path):
    pdf = FPDF(orientation="portrait", unit="mm", format="A4")
    pdf.set_auto_page_break(False)

    pdf.add_font(family="Georgia", fname=r"C:\Windows\Fonts\georgia.ttf")
    pdf.add_font(family="Georgia", style="B", fname=r"C:\Windows\Fonts\georgiab.ttf")
    pdf.add_font(family="Georgia", style="I", fname=r"C:\Windows\Fonts\georgiai.ttf")
    pdf.add_font(family="Body", fname=r"C:\Windows\Fonts\calibri.ttf")
    pdf.add_font(family="Body", style="B", fname=r"C:\Windows\Fonts\calibrib.ttf")
    pdf.add_font(family="Body", style="I", fname=r"C:\Windows\Fonts\calibrii.ttf")

    # --- Cover page ---
    pdf.add_page()
    pdf.set_fill_color(*CREAM)
    pdf.rect(0, 0, 210, 297, "F")

    pdf.set_draw_color(*SAGE_500)
    pdf.set_line_width(0.8)
    pdf.rect(15, 15, 180, 267)
    pdf.set_line_width(0.3)
    pdf.rect(18, 18, 174, 261)

    pdf.ln(55)
    pdf.set_font("Georgia", style="B", size=14)
    pdf.set_text_color(*SAGE_700)
    pdf.cell(0, 8, "FERN  &  FEATHER", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Georgia", style="I", size=11)
    pdf.set_text_color(*SAGE_500)
    pdf.cell(0, 7, "Counseling and Wellness", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(25)
    pdf.set_font("Georgia", style="B", size=30)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 16, "Anxiety", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 16, "Toolkit", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(15)
    pdf.set_font("Body", style="", size=13)
    pdf.set_text_color(80, 80, 80)
    for line in ["12 evidence-based coping skills", "you can use right now."]:
        pdf.cell(0, 8, line, align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(5)
    pdf.set_font("Body", style="I", size=11)
    pdf.set_text_color(*SAGE_700)
    pdf.cell(0, 8, "Grounding, breathing, and relaxation techniques", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "science-backed and trauma-informed.", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(20)
    pdf.set_font("Body", style="I", size=11)
    pdf.cell(0, 7, "Cut along the dotted lines and carry these", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "cards in your wallet as a quick reset.", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(35)
    pdf.set_font("Body", style="", size=10)
    pdf.set_text_color(150, 150, 150)
    pdf.cell(0, 6, WEBSITE, align="C", new_x="LMARGIN", new_y="NEXT")

    # --- Card pages ---
    # Wallet-sized landscape cards: 2 columns x 4 rows = 8 per page
    cols = 2
    rows = 4
    cards_per_page = cols * rows  # 8

    margin_x = 12
    margin_y = 14
    gap_x = 6
    gap_y = 4
    card_r = 3  # corner radius in mm

    card_w = (210 - 2 * margin_x - (cols - 1) * gap_x) / cols
    card_h = (297 - 2 * margin_y - (rows - 1) * gap_y) / rows

    for page_idx in range(2):
        pdf.add_page()
        pdf.set_fill_color(*CREAM)
        pdf.rect(0, 0, 210, 297, "F")

        start = page_idx * cards_per_page
        for i in range(cards_per_page):
            skill_idx = start + i
            if skill_idx >= 12:
                break

            col = i % cols
            row = i // cols
            x = margin_x + col * (card_w + gap_x)
            y = margin_y + row * (card_h + gap_y)

            # --- card background (rounded) ---
            pdf.set_fill_color(*SAGE_50)
            fill_rounded_rect(pdf, x, y, card_w, card_h, card_r)

            # --- card border (rounded) ---
            pdf.set_draw_color(*SAGE_500)
            pdf.set_line_width(0.3)
            draw_rounded_border(pdf, x, y, card_w, card_h, card_r)

            # --- color bar at top (rounded top corners) ---
            bar_h = 7
            pdf.set_fill_color(*SAGE_700)
            pdf.set_draw_color(*SAGE_700)
            fill_rounded_bar(pdf, x, y, card_w, bar_h, card_r)

            # category tag in bar
            tag = SKILLS[skill_idx]["tag"]
            pdf.set_font("Body", style="B", size=7)
            pdf.set_text_color(*WHITE)
            pdf.set_xy(x + 3, y + 1.5)
            pdf.cell(card_w - 6, 4, tag.upper(), align="C")

            # number circle
            r = 5
            cx = x + card_w / 2
            cy = y + bar_h + 9
            pdf.set_fill_color(*SAGE_700)
            pdf.set_draw_color(*SAGE_700)
            pdf.circle(cx, cy, r, style="DF")
            pdf.set_font("Body", style="B", size=8)
            pdf.set_text_color(*WHITE)
            pdf.set_xy(cx - r, cy - 2.5)
            pdf.cell(2 * r, 5, str(skill_idx + 1), align="C")

            # card title
            title = SKILLS[skill_idx]["name"]
            pdf.set_font("Georgia", style="B", size=10)
            pdf.set_text_color(*SAGE_700)
            title_w = card_w - 4
            pdf.set_xy(x + 2, y + bar_h + 16)
            title_lines = pdf.multi_cell(title_w, 4.5, title, align="C", dry_run=True, output="LINES")
            for tl in title_lines:
                pdf.set_x(x + 2)
                pdf.cell(title_w, 4.5, tl, align="C", new_x="LMARGIN", new_y="NEXT")

            # separator
            sep_y = pdf.get_y() + 1.5
            line_w = card_w * 0.4
            pdf.set_draw_color(*SAGE_500)
            pdf.set_line_width(0.3)
            pdf.line(x + (card_w - line_w) / 2, sep_y, x + (card_w + line_w) / 2, sep_y)

            pdf.ln(2)

            # steps
            for step in SKILLS[skill_idx]["steps"]:
                pdf.set_font("Body", style="B", size=7.5)
                pdf.set_text_color(*SAGE_500)
                pdf.set_x(x + 4)
                pdf.cell(3, 4, "\u2022")

                pdf.set_font("Body", style="", size=7.5)
                pdf.set_text_color(*DARK)
                step_lines = pdf.multi_cell(card_w - 10, 4, step, dry_run=True, output="LINES")
                if len(step_lines) > 1:
                    pdf.cell(card_w - 13, 4, step_lines[0], new_x="LMARGIN", new_y="NEXT")
                    for sl in step_lines[1:]:
                        pdf.set_x(x + 7)
                        pdf.cell(card_w - 11, 4, sl, new_x="LMARGIN", new_y="NEXT")
                else:
                    pdf.cell(card_w - 13, 4, step_lines[0], new_x="LMARGIN", new_y="NEXT")
                pdf.ln(0.5)

            # footer in card
            foot_y = y + card_h - 11
            pdf.set_draw_color(*SAGE_500)
            pdf.set_line_width(0.2)
            pdf.line(x + 3, foot_y, x + card_w - 3, foot_y)

            # brand name
            pdf.set_xy(x + 2, foot_y + 1)
            pdf.set_font("Body", style="I", size=6)
            pdf.set_text_color(*SAGE_500)
            pdf.cell(card_w - 4, 3, BRAND, align="C", new_x="LMARGIN", new_y="NEXT")

            # website
            pdf.set_x(x + 2)
            pdf.set_font("Body", style="", size=5.5)
            pdf.set_text_color(*SAGE_500)
            pdf.cell(card_w - 4, 3, WEBSITE, align="C")

    # --- Back cover ---
    pdf.add_page()
    pdf.set_fill_color(*CREAM)
    pdf.rect(0, 0, 210, 297, "F")

    pdf.set_draw_color(*SAGE_500)
    pdf.set_line_width(0.8)
    pdf.rect(15, 15, 180, 267)
    pdf.set_line_width(0.3)
    pdf.rect(18, 18, 174, 261)

    pdf.ln(45)
    pdf.set_font("Georgia", style="B", size=24)
    pdf.set_text_color(*SAGE_700)
    pdf.cell(0, 14, "About This Toolkit", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(10)
    pdf.set_left_margin(35)
    pdf.set_right_margin(35)

    pdf.set_font("Body", style="", size=12)
    pdf.set_text_color(*DARK)
    intro = (
        "These 12 coping skills are drawn from "
        "evidence-based therapeutic approaches including "
        "CBT, DBT, somatic therapy, and mindfulness-based "
        "stress reduction.\n\n"
        "They are not a substitute for professional care, "
        "but they can help you regulate your nervous system "
        "in moments of stress, anxiety, or overwhelm.\n\n"
        "We use these same techniques with our clients every "
        "day. We hope they bring you a little more calm, "
        "groundedness, and self-compassion."
    )
    pdf.multi_cell(0, 7, intro, align="L")

    pdf.ln(15)

    # contact box (rounded)
    bx_w = 140
    bx_x = 35
    bx_y = pdf.get_y()
    bx_h = 42
    bx_r = 3

    pdf.set_fill_color(*SAGE_50)
    pdf.set_draw_color(*SAGE_700)
    pdf.set_line_width(0.5)
    fill_rounded_rect(pdf, bx_x, bx_y, bx_w, bx_h, bx_r)
    draw_rounded_border(pdf, bx_x, bx_y, bx_w, bx_h, bx_r)

    pdf.set_font("Georgia", style="B", size=13)
    pdf.set_text_color(*SAGE_700)
    pdf.set_x(bx_x + 2)
    pdf.cell(bx_w - 4, 9, BRAND, align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Body", style="", size=11)
    pdf.set_text_color(*DARK)
    pdf.ln(3)
    for line in [
        "566 Peachtree Pkwy Suite 122, Cumming, GA 30041",
        "info@fernandfeathercounseling.com",
        "770-563-8334",
        WEBSITE,
    ]:
        pdf.set_x(bx_x + 2)
        pdf.cell(bx_w - 4, 6, line, align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.set_left_margin(10)
    pdf.set_right_margin(10)

    pdf.ln(25)
    pdf.set_font("Body", style="I", size=9)
    pdf.set_text_color(150, 150, 150)
    pdf.set_left_margin(30)
    pdf.set_right_margin(30)
    disclaimer = (
        "Please note: This toolkit is for educational purposes and is not "
        "a substitute for professional mental health treatment. If you are "
        "in crisis, call or text 988 (Suicide & Crisis Lifeline) or go to "
        "your nearest emergency room."
    )
    pdf.multi_cell(0, 5, disclaimer, align="C")

    pdf.set_left_margin(10)
    pdf.set_right_margin(10)

    pdf.output(out_path)
    print(f"PDF generated: {out_path}")
    print(f"Size: {os.path.getsize(out_path):,} bytes")


if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(base, "anxiety-toolkit.pdf")
    make_pdf(out)