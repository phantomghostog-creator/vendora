'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  cartTotal: number;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load cart on mount or user change
  useEffect(() => {
    if (user) {
      fetchUserCart();
    } else {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user]);

  const fetchUserCart = async () => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id);
    
    if (error) {
      console.error('Error fetching cart:', error);
    } else {
      setItems(data || []);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (user) {
      const existingItem = items.find(i => i.product_id === product.id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: product.id,
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,product_id' });
      
      if (error) {
        console.error('Error adding to cart:', error);
      } else {
        setNotification(`Added ${product.name} to cart`);
        fetchUserCart();
      }
    } else {
      setNotification(`Added ${product.name} to cart`);
      setItems(prev => {
        const existing = prev.find(i => i.product_id === product.id);
        if (existing) {
          return prev.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
        }
        return [...prev, {
          id: Math.random().toString(36).substring(7),
          user_id: 'guest',
          product_id: product.id,
          quantity,
          product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }];
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) {
        console.error('Error removing from cart:', error);
      } else {
        fetchUserCart();
      }
    } else {
      setItems(prev => prev.filter(i => i.product_id !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);

    if (user) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) {
        console.error('Error updating quantity:', error);
      } else {
        fetchUserCart();
      }
    } else {
      setItems(prev => prev.map(i => i.product_id === productId ? { ...i, quantity } : i));
    }
  };

  const clearCart = async () => {
    if (user) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error clearing cart:', error);
      } else {
        setItems([]);
      }
    } else {
      setItems([]);
    }
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, cartTotal, notification, setNotification }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
