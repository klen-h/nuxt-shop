<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <div class="product-overlay">
        <button @click="addToCart" class="add-to-cart-btn">
          🛒 加入购物车
        </button>
      </div>
      <!-- 添加一个小的购物车提示 -->
      <div class="cart-hint" @click="addToCart">
        🛒
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <span class="current-price">¥{{ product.price }}</span>
        <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
      </div>
      <div class="product-rating">
        <div class="stars">
          <span 
            v-for="i in 5" 
            :key="i"
            class="star"
          >
            {{ i <= product.rating ? '★' : '☆' }}
          </span>
        </div>
        <span class="rating-text">({{ product.reviews }}条评价)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()

const addToCart = () => {
  emit('addToCart', props.product)
}
</script>

<style lang="scss" scoped>
// 变量定义
$primary-color: #ff6b35;
$secondary-color: #e55a2b;
$text-color: #333;
$text-light: #666;
$border-color: #e0e0e0;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
$transition: all 0.3s ease;

.product-card {
  background: white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  overflow: hidden;
  transition: $transition;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

    .product-overlay {
      opacity: 1;
    }
  }

  .product-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: $transition;
    }

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: $transition;

      .add-to-cart-btn {
        background: $primary-color;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: $transition;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 120px;
        justify-content: center;

        &:hover {
          background: $secondary-color;
          transform: scale(1.05);
        }
      }
    }

    .cart-hint {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      opacity: 0.8;
      transition: $transition;
      cursor: pointer;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  .product-info {
    padding: 16px;

    .product-name {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: $text-color;
      line-height: 1.4;
    }

    .product-description {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: $text-light;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-price {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;

      .current-price {
        font-size: 18px;
        font-weight: 700;
        color: $primary-color;
      }

      .original-price {
        font-size: 14px;
        color: $text-light;
        text-decoration: line-through;
      }
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 8px;

      .stars {
        display: flex;
        gap: 2px;

        .star {
          color: #ffd700;
          font-size: 16px;
        }
      }

      .rating-text {
        font-size: 12px;
        color: $text-light;
      }
    }
  }
}
</style> 