import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_BASE = 'http://10.0.2.2:8090';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/categories`);
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      setMessage('Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (categorieId) => {
    setProductLoading(true);
    setSelectedProduct(null);
    setReviews([]);
    try {
      const response = await fetch(`${API_BASE}/api/produits?categorieId=${categorieId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage('Impossible de charger les produits');
    } finally {
      setProductLoading(false);
    }
  };

  const loadReviews = async (produitId) => {
    try {
      const response = await fetch(`${API_BASE}/api/avis/${produitId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setMessage('Impossible de charger les avis');
    }
  };

  const onProductPress = (produit) => {
    setSelectedProduct(produit);
    loadReviews(produit.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Boutique</Text>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <View style={styles.section}>
        <Text style={styles.label}>Catégorie</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={styles.picker}>
            {categories.map((categorie) => (
              <Picker.Item key={categorie.id} label={categorie.nom} value={categorie.id} />
            ))}
          </Picker>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Produits</Text>
        {productLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(item)}>
                <Text style={styles.productName}>{item.nom}</Text>
                <Text>{item.prix.toFixed(2)} €</Text>
                <Text>Stock : {item.stock}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      {selectedProduct ? (
        <View style={styles.section}>
          <Text style={styles.label}>Avis pour {selectedProduct.nom}</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <Text style={styles.reviewAuthor}>{item.auteur} — {item.note}/5</Text>
                <Text>{item.commentaire}</Text>
              </View>
            )}
            ListEmptyComponent={<Text>Aucun avis pour ce produit.</Text>}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  productCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reviewAuthor: {
    fontWeight: '600',
    marginBottom: 4,
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
  },
});
