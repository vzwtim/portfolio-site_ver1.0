import os

# The script is in the directory with the files
target_dir = "." 

for dirpath, dirnames, filenames in os.walk(target_dir):
    for filename in filenames:
        if " (" in filename and ")" in filename:
            new_filename = filename.replace(" (", "").replace(")", "")
            old_filepath = os.path.join(dirpath, filename)
            new_filepath = os.path.join(dirpath, new_filename)
            os.rename(old_filepath, new_filepath)
            print(f"Renamed: {old_filepath} -> {new_filepath}")
