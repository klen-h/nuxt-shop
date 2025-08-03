<template>
  <div class="shopping-cart">
    <div class="cart-header">
      <h2>购物车</h2>
      <button @click="$emit('close')" class="close-btn">×</button>
    </div>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>购物车是空的</p>
      <button @click="$emit('close')" class="continue-shopping-btn">继续购物</button>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-info">
            <h4 class="item-name">{{ item.name }}</h4>
            <p class="item-price">¥{{ item.price }}</p>
          </div>
          <div class="item-actions">
            <div class="quantity-controls">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
                class="quantity-btn"
              >
                -
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="quantity-btn"
              >
                +
              </button>
            </div>
            <button 
              @click="$emit('removeItem', item.id)"
              class="remove-btn"
            >
              删除
            </button>
          </div>
        </div>
      </div>
      
      <div class="cart-footer">
        <div class="cart-total">
          <span>总计:</span>
          <span class="total-price">¥{{ totalPrice }}</span>
        </div>
        <div class="cart-actions">
          <button @click="$emit('clearCart')" class="clear-cart-btn">
            清空购物车
          </button>
          <button @click="$emit('checkout')" class="checkout-btn">
            结算
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface Props {
  cartItems: CartItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  updateQuantity: [itemId: number, quantity: number]
  removeItem: [itemId: number]
  clearCart: []
  checkout: []
}>()

const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value >= 99 ? 0 : 10
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

const updateQuantity = (itemId: number, quantity: number) => {
  emit('updateQuantity', itemId, quantity)
}

const totalPrice = computed(() => {
  return total.value.toFixed(2)
})
</script>

<style lang="scss" scoped>
// 变量定义
$primary-color: #ff6b35;
$secondary-color: #e55a2b;
$text-color: #333;
$text-light: #666;
$border-color: #e0e0e0;
$bg-light: #f9f9f9;
$shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
$border-radius: 8px;
$transition: all 0.2s ease;

.shopping-cart {
  width: 400px;
  max-height: 80vh;
  background: white;
  box-shadow: $shadow;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius 0 0 $border-radius;
  overflow: hidden;

  .cart-header {
    padding: 20px;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      font-size: 18px;
      color: $text-color;
    }

    .close-btn {
      background: none;
      border: none;
      color: $text-light;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: color 0.2s;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .empty-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    color: $text-light;

    p {
      margin: 0 0 20px 0;
      font-size: 16px;
    }

    .continue-shopping-btn {
      background: $primary-color;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: $transition;

      &:hover {
        background: $secondary-color;
      }
    }
  }

  .cart-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 20px;

      .cart-item {
        display: flex;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          margin-right: 16px;
        }

        .item-info {
          flex: 1;

          .item-name {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: $text-color;
          }

          .item-price {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: $primary-color;
          }
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 12px;

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;

            .quantity-btn {
              background: $bg-light;
              border: none;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              color: $text-color;
              cursor: pointer;
              transition: $transition;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover:not(:disabled) {
                background: $primary-color;
                color: white;
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }
            }

            .quantity {
              font-size: 14px;
              font-weight: 600;
              color: $text-color;
              min-width: 20px;
              text-align: center;
            }
          }

          .remove-btn {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: color 0.2s;
            font-size: 14px;

            &:hover {
              color: #ff4757;
            }
          }
        }
      }
    }

    .cart-footer {
      padding: 20px;
      border-top: 1px solid $border-color;
      background: $bg-light;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        color: $text-color;

        .total-price {
          color: $primary-color;
        }
      }

      .cart-actions {
        display: flex;
        gap: 10px;

        .clear-cart-btn, .checkout-btn {
          background: $primary-color;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: $transition;
          flex: 1;

          &:hover {
            background: $secondary-color;
          }
        }

        .clear-cart-btn {
          background: #6c757d;

          &:hover {
            background: #5a6268;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .shopping-cart {
    width: 100%;
    max-height: 90vh;
    border-radius: 0;
  }
}
</style> 