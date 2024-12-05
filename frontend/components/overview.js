import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Overview() {
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Platform.OS === "ios" ? height * 0.1 : height * 0.08 },
      ]}
    >
      <View
        style={[
          styles.header,
          { paddingTop: height * 0.03, marginBottom: height * 0.04 },
        ]}
      >
        <Text
          style={[
            styles.title,
            { fontSize: width < 350 ? 16 : width < 600 ? 18 : 20 },
          ]}
        >
          Overview
        </Text>
      </View>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.blue]}>
          <Text style={styles.cardText}>Health Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.pink]}>
          <Text style={styles.cardText}>Allergy Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.green]}>
          <Text style={styles.cardText}>Symptoms Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.cyan]}>
          <Text style={styles.cardText}>Treatment & Medications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.yellow]}>
          <Text style={styles.cardText}>Vital Signs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.red]}>
          <Text style={styles.cardText}>Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: Platform.OS === "ios" ? 120 : 100, // Space for tab bar
  },
  header: {
    width: "100%",
    paddingTop: 30, // More space at the top for the header
    paddingBottom: 10, // Reduced padding for header
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30, // Increased margin to move header further down
  },
  title: {
    fontSize: width < 350 ? 16 : width < 600 ? 18 : 20, // Larger title
    color: "#577CEF", // Title color
    fontWeight: "normal", // No bold
    marginTop: 50,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Centered grid
    paddingHorizontal: 10, // Added padding to prevent edges from touching screen
  },
  card: {
    width: width - 100 < 350 ? "38%" : width - 100 < 600 ? "42%" : "30%", // Slightly reduced card width
    height:
      width - 100 < 350
        ? width * 0.35
        : width - 100 < 600
        ? width * 0.4
        : width * 0.3, 
    padding: 8, 
    borderRadius: 6, 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12, // Increased vertical margin for more space between rows
    marginHorizontal: 12, // Increased horizontal margin for more space between boxes
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Smaller shadow offset
    shadowOpacity: 0.2, // Lighter shadow opacity
    shadowRadius: 5, // Smaller shadow radius
    elevation: 5, // Lighter elevation for Android shadow
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width < 350 ? 10 : width < 600 ? 12 : 14, // Adjusted font size for text inside cards
    textAlign: "center", // Centered text
  },
  blue: { backgroundColor: "#577CEF" },
  pink: { backgroundColor: "#CD7DB0" },
  green: { backgroundColor: "#98D7A9" },
  cyan: { backgroundColor: "#7ED8EB" },
  yellow: { backgroundColor: "#AAA24C" },
  red: { backgroundColor: "#E53C3E" },
});
