import json

file = "gene_mappings.json"

with open(file) as f:
    data = json.load(f)

old_map = data["mapping"]

new_map = {}
sec_genes = []

for primary, secondary in old_map.items():
    new_map[secondary] = primary
    sec_genes.append(secondary)

data["mapping"] = dict(sorted(new_map.items()))
data["sec_genes"] = sorted(sec_genes)

with open("gene_mappings_updated.json", "w") as f:
    json.dump(data, f, indent=2)

print("Reversed mapping and created sec_genes list")
