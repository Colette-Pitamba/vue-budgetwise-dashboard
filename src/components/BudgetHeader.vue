<script setup>
  /**
    * Budget Header Component
    * 
    * This component provides the main header interface for the budget section.
    * It displays the title, month selection dropdown, and action buttons including the
    * transaction form trigger.
    * 
    * Features:
    * - Month selection dropdown with support for abbreviating long month names
    * - Share and options buttons for additional functionality
    * - Add transaction button with hover tooltip
    * - Transaction form modal that appears when the add button is clicked
    * 
    * 
    * Emits:
    * - transaction-saved: Triggered when a new transaction is saved
    * 
    * TODO: Create function to filter transaction data based on the selected month.
    */

  import { ref, computed } from 'vue';
  import TransactionForm from '@/components/TransactionForm.vue';

  const currentMonth = ref('April 2022');
  const showMonthDropdown = ref(false);
  const showAddTransactionModal = ref(false);

  const months = ref([
    'January 2022',
    'February 2022',
    'March 2022',
    'April 2022',
    'May 2022',
    'June 2022',
    'February 2025'
  ]);

  // Truncate longer month names
  const formattedMonth = computed(() => {
    const parts = currentMonth.value.split(' ');

    if (parts.length === 2) {
      const month = parts[0];
      const year = parts[1];

      // If month is longer than 5 characters, abbreviate it
      if (month.length > 5) {
        return `${month.substring(0, 3)} ${year}`;
      }
    }

    return currentMonth.value;
  });

  const toggleMonthDropdown = () => {
    showMonthDropdown.value = !showMonthDropdown.value;
  };

  const selectMonth = (month) => {
    currentMonth.value = month;
    showMonthDropdown.value = false;
  };

  const toggleAddTransactionModal = () => {
    showAddTransactionModal.value = !showAddTransactionModal.value;
  };

  const emit = defineEmits(['transaction-saved']);

  const handleSaveTransaction = (newTransaction) => {
    showAddTransactionModal.value = false;
    
    // Emit an event that the parent can listen for
    emit('transaction-saved', newTransaction);
  };
</script>

<template>
  <div class="budget-header flex justify-between items-center w-[660px] h-[70px]">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <h1 class="text-[21px] font-semibold text-[#2B2B2B] leading-[145%]">Monthly Budget</h1>

        <button @click="toggleMonthDropdown" class="flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Month selector -->
      <div class="relative">
        <button 
          @click="toggleMonthDropdown"
          class="flex items-center justify-between px-2 py-1.5 bg-[rgba(76,131,216,0.12)] border border-[#4C83D8] rounded-lg w-[130px] h-[32px] overflow-hidden"
        >
          <span class="text-[14px] font-semibold text-[#4C83D8] truncate">{{ formattedMonth }}</span>

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0">
            <path d="M6.175 7.158L10 10.975L13.825 7.158L15 8.333L10 13.333L5 8.333L6.175 7.158Z" fill="#4C83D8"/>
          </svg>
        </button>
        
        <!-- Dropdown menu -->
        <div 
          v-if="showMonthDropdown" 
          class="absolute z-10 mt-1 w-[130px] bg-white rounded-md shadow-lg py-1"
        >
          <button 
            v-for="month in months" 
            :key="month" 
            @click="selectMonth(month)" 
            class="block w-full text-left px-3 py-1.5 text-[14px] text-[#2B2B2B] hover:bg-gray-100"
          >
            {{ month }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Action buttons -->
    <div class="flex items-center gap-4">
      <!-- Share button -->
      <button class="flex items-center justify-center w-6 h-6">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08ZM15 2C15.55 2 16 2.45 16 3C16 3.55 15.55 4 15 4C14.45 4 14 3.55 14 3C14 2.45 14.45 2 15 2ZM3 11C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9C3.55 9 4 9.45 4 10C4 10.55 3.55 11 3 11ZM15 18.02C14.45 18.02 14 17.57 14 17.02C14 16.47 14.45 16.02 15 16.02C15.55 16.02 16 16.47 16 17.02C16 17.57 15.55 18.02 15 18.02Z" fill="#2B2B2B"/>
        </svg>
      </button>
      
      <!-- More options button -->
      <button class="flex items-center justify-center w-6 h-6">
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="#2B2B2B"/>
        </svg>
      </button>
      
      <!-- Add button -->
      <div class="relative group">
        <button 
          @click="toggleAddTransactionModal"
          class="flex items-center justify-center w-11 h-11 bg-[#4C83D8] cursor-pointer hover:bg-[#3b72c7] transition-colors duration-200 rounded-full">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5.83301V22.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.83301 14H22.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Tooltip -->
        <div class="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div class="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap">
            Add new transaction
          </div>
          <!-- Tooltip arrow -->
          <div class="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 right-5"></div>
        </div>
      </div>
    </div>
  </div>

  <TransactionForm
    v-if="showAddTransactionModal"
    @close="toggleAddTransactionModal"
    @save="handleSaveTransaction"
  />
</template>

<style scoped>
  .budget-header {
    position: relative;
    font-family: 'Outfit', sans-serif;
    margin-left: 36px;
    margin-bottom: 24px;
    margin-top: 29px;
  }
</style>
