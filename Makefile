create-struct: get-struct-creator run-struct-creator

run-struct-creator:
	python create_structure.py

get-struct-creator:
	curl -L -o create_structure.py https://raw.githubusercontent.com/kolelan/create_structure/main/create_structure.py