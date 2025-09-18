# OpenGeometry Polygon Test Suite

An interactive polygon testing application with a comprehensive dataset of diverse polygon shapes for testing OpenGeometry's polygon rendering capabilities.

## Overview

This test suite provides a user-friendly interface to test various polygon shapes with the OpenGeometry library. It includes a dropdown selector to switch between different polygon types, interactive controls for visualization parameters, and detailed information about each polygon.

## Features

- **Interactive Polygon Selection**: Dropdown menu to select from 35+ different polygon shapes
- **Real-time Controls**: GUI controls for wireframe mode, vertex labeling, and camera settings
- **Comprehensive Dataset**: Polygons ranging from basic shapes to complex real-world geometries
- **Performance Testing**: Multiple complexity levels for performance analysis
- **Vertex Information**: Display vertex coordinates and polygon metadata

## Dataset Categories

### Basic Shapes (4 polygons)
- Triangle, Square, Rectangle, Rhombus

### Regular Polygons (4 polygons)  
- Pentagon, Hexagon, Octagon, Decagon

### Stars & Crosses (4 polygons)
- Star (5-point), Star (6-point), Star (8-point), Cross/Plus

### Architectural (2 polygons)
- Building Footprint, Wall Polygon Complex

### Mechanical (2 polygons)
- Gear Tooth, Hexagonal Nut

### Organic Shapes (2 polygons)
- Spiral Approximation, Kidney Shape

### Patterns (2 polygons)
- Lightning Bolt, Sawtooth Pattern

### Complex Shapes (4 polygons)
- Complex Polygon (15-vertex), Complex Multi-Contour Shape, Pentagon with Hole Outline

### Test Cases (6 polygons)
- Bad Diagonals Test, Shared Points Complex, Issue45 Complex Shape, Steiner Points Test, Degenerate Polygon

### Performance Testing (3 polygons)
- Basic (12 vertices), Medium (24 vertices), Large (42 vertices)

## Technical Details

- **3D Coordinates**: All polygons use Vector3 with Y=0 (flat on XZ plane)
- **OpenGeometry Integration**: Compatible with OpenGeometry Polygon class
- **THREE.js Rendering**: Uses THREE.js for 3D visualization
- **Interactive Controls**: dat.GUI for real-time parameter adjustment

## Data Sources

The polygon dataset combines:
- **Original Designs**: Custom shapes designed for various testing scenarios
- **OpenGeometry Examples**: Complex shapes from existing repository examples
- **Earcut Test Suite**: Real-world polygons from the Mapbox Earcut triangulation library
- **earcutr Repository**: Additional complex test cases from the donbright/earcutr repository

## Usage

1. Open `polygonTestSuite.html` in a web browser
2. Use the dropdown to select different polygon shapes
3. Adjust visualization settings with the control panel
4. Observe polygon rendering and vertex coordinates
5. Test performance with different complexity levels

## File Structure

- `polygonTestSuite.html` - Main test application
- `polygonDataset.json` - Complete polygon dataset (35+ shapes)
- `README_PolygonTestSuite.md` - This documentation

## Performance Notes

The dataset includes polygons of varying complexity for performance testing:
- **Low Complexity**: 3-12 vertices (basic shapes, regular polygons)
- **Medium Complexity**: 15-24 vertices (complex architectural shapes)
- **High Complexity**: 24-42+ vertices (performance testing, real-world data)

This range allows testing of OpenGeometry's polygon rendering performance across different use cases from simple UI elements to complex architectural and geographical data.