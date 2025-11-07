import os
import gdown

def download_folder(folder_url, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Download the folder
    gdown.download_folder(
        url=folder_url,
        output=output_dir,
        quiet=False,
        use_cookies=False
    )

if __name__ == "__main__":
    # Your Google Drive folder URL
    FOLDER_URL = "https://drive.google.com/drive/folders/1y_ATn27CofUMOfPyVo7WqPP5EogXOkUL"
    OUTPUT_DIR = "public/images/products"
    
    print(f"Downloading images from {FOLDER_URL} to {OUTPUT_DIR}...")
    download_folder(FOLDER_URL, OUTPUT_DIR)
    print("Download completed!")
