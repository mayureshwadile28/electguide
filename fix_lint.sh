#!/bin/bash

# Fix motion imports by adding a comment to disable the rule for motion
find src -type f -name "*.jsx" -exec sed -i 's/import { motion/import { motion \/* eslint-disable-line no-unused-vars *\/ /g' {} +

# Fix vi in Components.test.jsx
sed -i 's/describe, it, expect, vi }/describe, it, expect }/g' src/tests/Components.test.jsx

# Fix useTransform in Timeline.jsx
sed -i 's/import { useScroll, useTransform }/import { useScroll } \/* eslint-disable-line no-unused-vars *\//g' src/components/Timeline.jsx
