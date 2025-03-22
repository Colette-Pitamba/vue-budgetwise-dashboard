<script setup>
  /**
  * Budget Summary Card Component
  * 
  * This component displays a summary of the user's budget status with a visual progress bar.
  * It shows three key financial metrics: amount spent, amount available, and total budget.
  * 
  * Features:
  * - Color-coded amounts (red for spent, green for available, black for budget)
  * - Visual progress bar showing percentage of budget spent
  * 
  * Props:
  * - spent: Number - The amount spent so far (defaults to 800)
  * - available: Number - The amount still available (defaults to 1200)
  * - budget: Number - The total budget amount (defaults to 2000)
  * 
  * The component automatically calculates the progress percentage based on spent/budget.
  */

  import { defineProps } from 'vue';

  // mock props default to fit Figma spec.
  const props = defineProps({
    spent: {
      type: Number,
      default: 800
    },
    available: {
      type: Number,
      default: 1200
    },
    budget: {
      type: Number,
      default: 2000
    }
  });

  const progressPercentage = (props.spent / props.budget) * 100;
</script>

<template>
  <div class="budget-card">
    <div class="budget-stats">
      <!-- Spent Section -->
      <div class="stats-column">
        <span class="stats-label">Spent</span>
        <span class="stats-amount stats-spent">${{ props.spent }}</span>
      </div>
      
      <!-- Vertical Divider -->
      <div class="vertical-divider"></div>
      
      <!-- Available Section -->
      <div class="stats-column">
        <span class="stats-label">Available</span>
        <span class="stats-amount stats-available">${{ props.available }}</span>
      </div>
      
      <!-- Vertical Divider -->
      <div class="vertical-divider"></div>
      
      <!-- Budget Section -->
      <div class="stats-column">
        <span class="stats-label">Budget</span>
        <span class="stats-amount stats-budget">${{ props.budget }}</span>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="budget-progress">
      <div class="progress-bar-bg">
        <div 
          class="progress-bar-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .budget-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 25px;
    gap: 16px;
    width: 408px;
    height: 143px;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 16px;
  }

  .budget-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 4px;
    width: 358px;
    height: 55px;
  }

  .stats-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    width: 100px;
    height: 55px;
  }

  .stats-label {
    width: auto;
    height: 17px;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.5px;
    color: #707070;
  }

  .stats-amount {
    margin-top: 4px;
    height: 35px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .stats-spent {
    color: #FE5C5C;
  }

  .stats-available {
    font-weight: 600;
    font-size: 21px;
    line-height: 145%;
    color: #53BD71;
  }

  .stats-budget {
    color: #2B2B2B;
  }

  .vertical-divider {
    width: 40px;
    height: 0px;
    border: 1px solid #707070;
    transform: rotate(90deg);
  }

  .budget-progress {
    width: 358px;
    height: 24px;
    position: relative;
  }

  .progress-bar-bg {
    position: absolute;
    width: 358px;
    height: 24px;
    background: #DDDDDD;
    border-radius: 8px;
  }

  .progress-bar-fill {
    position: absolute;
    height: 24px;
    background: #53BD71;
    border-radius: 8px;
  }
</style>
