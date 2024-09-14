#!/bin/bash

# Input: OpenAPI YAML file (overwrite the input)
INPUT_FILE="tools/openAPI_3.yaml"
TEMP_FILE="tools/temp.yaml"

# Step 1: Replace /:<path> with /{path}
sed -E 's|/:([a-zA-Z0-9_-]+)|/{\1}|g' "$INPUT_FILE" >"$TEMP_FILE"

# Step 2: If the path has a **/{param}** and the parameters section of the path
# has a field with the found name and its "in" config is "query", change it to "path" instead.
awk '
# Variables to track state
BEGIN {
    inside_param = 0;
    param_name = "";
    path_params = "";
}

# Look for paths with placeholders in the path (e.g., /{param})
/\/\{[a-zA-Z0-9_]+\}/ {
    path_params = "";  # Reset path parameters for each path
    n = split($0, arr, "[{}]");  # Split path on curly braces to find parameters
    for (i = 2; i < n; i += 2) {
        path_params = path_params " " arr[i];  # Collect all path parameters
    }
    print $0;
    next;
}

# Detect the start of a parameters section
/parameters:/ {
    inside_param = 1;
    print $0;
    next;
}

# Detect the name of the parameter
/- name:/ {
    if (inside_param == 1) {
        param_name = $3;
    }
    print $0;
    next;
}

# Replace "in: query" with "in: path" if the parameter name is found in the path_params
/in: query/ {
    if (inside_param == 1 && index(path_params, param_name) > 0) {
        gsub("query", "path");
    }
    print $0;
    next;
}

# Reset states when the parameters section ends
/^-$/ {
    inside_param = 0;
    param_name = "";
    print $0;
    next;
}

# For all other lines, just print them as they are
{
    print $0;
}
' "$TEMP_FILE" >"$TEMP_FILE.tmp"

# Step 3: Replace TEMP_FILE with the new content
mv "$TEMP_FILE.tmp" "$TEMP_FILE"

# Optionally save the temp file back to the input file
mv "$TEMP_FILE" "$INPUT_FILE"
