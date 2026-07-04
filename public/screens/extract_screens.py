# Screen node IDs to try - based on common Figma prototype structures
# These will be refined based on actual responses
screens_to_try = [
    ("Welcome", "831:6216"),  # User provided node
    ("Search", "831:6217"),
    ("Route Options", "831:6218"),
    ("Route Preview", "831:6219"),
    ("Navigation", "831:6220"),
    ("Share", "831:6221"),
]

print("Screens to extract from Figma prototype:")
for title, node_id in screens_to_try:
    print(f"  - {title}: {node_id}")
