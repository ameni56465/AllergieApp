import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const { width } = Dimensions.get('window');

const backendUrl = 'http://192.168.1.16:8000';

export default function ScannerScreen() {
  const [scanning, setScanning] = useState(true);
  const [barcodeData, setBarcodeData] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const handleBarCodeScanned = ({ data }) => {
    setBarcodeData(data);
    setScanning(false);

    fetchProductDetails(data);
  };

  const fetchProductDetails = (barcode) => {
    axios
      .get(`${backendUrl}/product/${barcode}`)
      .then((response) => {
        const product = response.data;
        setProductDetails(product);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch product details');
      });
  };

  const startScanning = () => {
    setScanning(true);
    setBarcodeData(null);
    setProductDetails(null);
  };

  return (
    <View style={styles.container}>
      {scanning && (
        <RNCamera
          style={StyleSheet.absoluteFillObject}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarCodeScanned}
          captureAudio={false}
        >
          <View style={styles.cameraOverlay} />
        </RNCamera>
      )}
      {barcodeData && (
        <View style={styles.cardContainer}>
          <Card>
            <Card.Title>Product Details</Card.Title>
            <Card.Divider />
            {productDetails && (
              <>
                <Image
                  style={styles.productImage}
                  resizeMode="contain"
                  source={{ uri: productDetails.photo }}
                />
                <Text style={styles.productDetails}>Name: {productDetails.name}</Text>
                <Text style={styles.productDetails}>Composition: {productDetails.composition}</Text>
              </>
            )}
            <TouchableOpacity style={[styles.button, styles.scanButton]} onPress={startScanning}>
              <Text style={styles.buttonText}>Scan Another Product</Text>
            </TouchableOpacity>
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  productDetails: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
