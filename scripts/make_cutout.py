"""
Extract clean transparent alpha cutout from Kabish standing portrait
using rembg (u2net) for high-end studio quality.
"""
import os
from PIL import Image
from rembg import remove

def main():
    src_path = os.path.join("public", "kabish_standing_suit.jpg")
    out_path = os.path.join("public", "kabish_standing_cutout.png")
    
    print(f"Reading {src_path}...")
    with open(src_path, "rb") as f:
        input_data = f.read()
    
    print("Processing background removal via rembg...")
    output_data = remove(input_data)
    
    with open(out_path, "wb") as f:
        f.write(output_data)
    
    print(f"Saved transparent cutout to {out_path} (size: {os.path.getsize(out_path)} bytes)")
    
    # Also verify image can be opened and get dimensions
    img = Image.open(out_path)
    print(f"Cutout dimensions: {img.size}, mode: {img.mode}")

if __name__ == "__main__":
    main()
