"""Generate a stylish Wanted app icon"""
from PIL import Image, ImageDraw, ImageFont
import os

SIZE = 256
img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Background: dark rounded square
margin = 8
r = 40
bg_color = (20, 20, 24, 255)
draw.rounded_rectangle([margin, margin, SIZE-margin, SIZE-margin], radius=r, fill=bg_color)

# Inner border (gold accent)
border_color = (212, 160, 87, 255)
draw.rounded_rectangle([margin+3, margin+3, SIZE-margin-3, SIZE-margin-3], radius=r-2, outline=border_color, width=2)

# Crosshair/target circle
cx, cy = SIZE//2, SIZE//2 - 10
ring_r = 65
draw.ellipse([cx-ring_r, cy-ring_r, cx+ring_r, cy+ring_r], outline=border_color, width=3)
ring_r2 = 45
draw.ellipse([cx-ring_r2, cy-ring_r2, cx+ring_r2, cy+ring_r2], outline=(212, 160, 87, 120), width=2)

# Crosshair lines
line_color = (212, 160, 87, 180)
gap = 20
draw.line([cx, cy-ring_r-10, cx, cy-gap], fill=line_color, width=2)
draw.line([cx, cy+gap, cx, cy+ring_r+10], fill=line_color, width=2)
draw.line([cx-ring_r-10, cy, cx-gap, cy], fill=line_color, width=2)
draw.line([cx+gap, cy, cx+ring_r+10, cy], fill=line_color, width=2)

# Center dot
draw.ellipse([cx-5, cy-5, cx+5, cy+5], fill=(233, 69, 96, 255))

# "W" letter in center
try:
    font_large = ImageFont.truetype("C:/Windows/Fonts/impact.ttf", 72)
except:
    font_large = ImageFont.load_default()
draw.text((cx, cy), "W", fill=(255, 255, 255, 240), font=font_large, anchor="mm")

# "WANTED" text at bottom
try:
    font_sm = ImageFont.truetype("C:/Windows/Fonts/impact.ttf", 24)
except:
    font_sm = ImageFont.load_default()
draw.text((cx, SIZE - 35), "WANTED", fill=border_color, font=font_sm, anchor="mm")

# Save
out_dir = os.path.dirname(__file__)
img.save(os.path.join(out_dir, 'appIcon.png'))
img.save(os.path.join(out_dir, 'trayIcon.png'))
# ICO with multiple sizes
img.save(os.path.join(out_dir, 'appIcon.ico'), format='ICO', sizes=[(256,256),(48,48),(32,32),(16,16)])
print("Icons generated!")
