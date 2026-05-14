import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Sur un émulateur Android, 10.0.2.2 pointe vers l'hôte de développement.
// Sur un appareil réel ou Expo Go, remplacez par l'adresse IP de votre machine : http://<IP>:8090
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
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('5');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/categories`);
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      setMessage('Impossible de charger les catégories. Vérifiez l’URL de l’API et la connexion.');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (categorieId) => {
    setMessage('');
    setProductLoading(true);
    setSelectedProduct(null);
    setReviews([]);
    try {
      const response = await fetch(`${API_BASE}/api/produits?categorieId=${categorieId}`);
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage('Impossible de charger les produits.');
      setProducts([]);
    } finally {
      setProductLoading(false);
    }
  };

  const loadReviews = async (produitId) => {
    setMessage('');
    try {
      const response = await fetch(`${API_BASE}/api/avis/${produitId}`);
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setMessage('Impossible de charger les avis.');
      setReviews([]);
    }
  };

  const onCategoryPress = (categorie) => {
    setSelectedCategory(categorie.id);
    setSelectedProduct(null);
    setMessage('');
  };

  const onProductPress = (produit) => {
    setSelectedProduct(produit);
    setAuthor('');
    setComment('');
    setRating('5');
    loadReviews(produit.id);
  };

  const submitReview = async () => {
    if (!author.trim() || !comment.trim() || !rating) {
      setMessage('Veuillez remplir tous les champs du formulaire d’avis.');
      return;
    }

    const avis = {
      produitId: selectedProduct.id,
      auteur: author.trim(),
      commentaire: comment.trim(),
      note: Number(rating),
    };

    try {
      const response = await fetch(`${API_BASE}/api/avis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avis),
      });
      if (!response.ok) {
        throw new Error('Impossible d’envoyer l’avis');
      }
      setAuthor('');
      setComment('');
      setRating('5');
      setMessage('Avis ajouté avec succès !');
      loadReviews(selectedProduct.id);
    } catch (error) {
      setMessage('Impossible d’envoyer l’avis. Veuillez réessayer.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Boutique</Text>
      {message ? <Text style={styles.error}>{message}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.label}>Catégories</Text>
        {loading ? (
          <ActivityIndicator />
        ) : categories.length === 0 ? (
          <View style={styles.infoBox}>
            <Text>Aucune catégorie disponible.</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchCategories}>
              <Text style={styles.retryText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  item.id === selectedCategory && styles.categoryButtonActive,
                ]}
                onPress={() => onCategoryPress(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    item.id === selectedCategory && styles.categoryTextActive,
                  ]}
                >
                  {item.nom}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Produits</Text>
        {productLoading ? (
          <ActivityIndicator />
        ) : products.length === 0 ? (
          <Text>Aucun produit disponible pour cette catégorie.</Text>
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
          <Text style={styles.label}>Produit sélectionné</Text>
          <View style={styles.productCard}>
            <Text style={styles.productName}>{selectedProduct.nom}</Text>
            <Text>{selectedProduct.prix.toFixed(2)} €</Text>
            <Text>Stock : {selectedProduct.stock}</Text>
          </View>

          <Text style={styles.label}>Avis</Text>
          {reviews.length === 0 ? (
            <Text>Aucun avis pour ce produit.</Text>
          ) : (
            <FlatList
              data={reviews}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewAuthor}>{item.auteur} — {item.note}/5</Text>
                  <Text>{item.commentaire}</Text>
                </View>
              )}
            />
          )}

          <View style={styles.section}>
            <Text style={styles.label}>Ajouter un avis</Text>
            <TextInput
              style={styles.input}
              value={author}
              placeholder="Votre nom"
              onChangeText={setAuthor}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={comment}
              placeholder="Votre commentaire"
              multiline
              numberOfLines={4}
              onChangeText={setComment}
            />
            <TextInput
              style={styles.input}
              value={rating}
              placeholder="Note (1 à 5)"
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => setRating(value.replace(/[^0-9]/g, ''))}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
              <Text style={styles.submitButtonText}>Envoyer mon avis</Text>
            </TouchableOpacity>
          </View>
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
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryText: {
    color: '#333333',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#ffffff',
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
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 14,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
  },
  infoBox: {
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeeba',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
