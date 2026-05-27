import { configureStore, createSlice } from "@reduxjs/toolkit";

1//سبد خرید
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],// آیتم‌های موجود در سبد خرید
    isOpen: false,// وضعیت باز/بسته بودن سبد خرید
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (items) => items.id === action.payload.id,
      );
      //اگر محصولی از قبل باشد مقدار کوانتیتی را یک واحد زیاد کن
      //اگر نبود مقدارش را یک قرار بده 
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    //حذف کامل یک محصول از سبد با ایدی
    removeFromCart: (state,action) => {
      state.items = state.items.filter((items) => items.id !== action.payload);
    },
    //به‌روزرسانی تعداد یک محصول خاص اگر تعداد به صفر یا کمتر برسد، آن محصول حذف می‌شود
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.filter((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      if (item.quantity <= 0) {
        state.items = state.items.filter((items) => items.id !== id);
      }
    },
    //باز یا بسته کردن پنل سبد خرید
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    // خالی کردن کامل سبد خرید
    clearCart: (state) => {
      state.items = [];
    },
  },
});

2// لیست محصولات
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filters: { //دسته بندی براساس
      category: "all",
      priceRange: [0, 2000],
      color: "all",
    },
    sort: "newest", //ترتیب نمایش (جدیدترین)
  },
  reducers: {
    setProducts: (state, action) => { //جایگزینی لیست محصولات با آرایه جدید
      state.items = action.payload;
    },
    setFilters: (state, action) => { // به‌روزرسانی فیلترها (به صورت partial update)
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});


3//مودال 
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isProductModalOpen: false,
    selectedProduct: null,
    isCheckoutOpen: false,
  },
  reducers: {
    openProductModal: (state, action) => { //باز کردن مودال محصول و ذخیره محصول انتخاب شده
      state.isProductModalOpen = true;
      state.selectedProduct = action.payload;
    },
    closeProductModal: (state) => { //بستن مودال و پاک کردن محصول انتخاب شده
      state.isProductModalOpen = false;
      state.selectedProduct = null;
    },
    toggleCheckout: (state) => { //تغییر وضعیت باز/بسته بودن مودال تسویه حساب
      state.isCheckoutOpen = !state.isCheckoutOpen;
    },
  },
});
// ... action creators  مربوط به سبد خری

export const {addToCart,removeFromCart,updateQuantity,toggleCart,clearCart,} = cartSlice.actions;
export const { setProducts, setFilters, setSort } = productsSlice.actions;
export const { openProductModal, closeProductModal, toggleCheckout } =modalSlice.actions;


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    modal: modalSlice.reducer,
  },
});
