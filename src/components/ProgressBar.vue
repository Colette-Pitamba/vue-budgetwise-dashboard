<script setup>
  /**
   * Progress Bar Component
   * 
   * This component renders a progress bar that visually tracks spending against a budgeted amount 
   * for a specific category.
   *
   * - 'spent' (Number) represents the amount already spent in the category.
   * - 'budgeted' (Number) is the total amount allocated to the category.
   * - 'category' (String) determines the color of the progress bar based found in color map.
   *
   * The component calculates the progress as a percentage of the 'spent' amount relative 
   * to the 'budgeted' amount, and adjusts the progress bar's width accordingly.
   */

  import { computed, defineProps } from 'vue';

  const props = defineProps({
    spent: {
      type: Number,
      default: 0,
    },
    budgeted: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      required: true,
    },
  });

  const progressWidth = computed(() => {
    if (props.budgeted === 0) return '0%';

    let percentage = (props.spent / props.budgeted) * 100;

    return `${Math.min(percentage, 100)}%`;
  });

  // Compute progress color based on category
  const progressColor = computed(() => {
    const colorMap = {
      "Education": "#46BDC6",
      "Entertainment": "#FF8301",
      "Food": "#213B80",
      "Groceries": "#00BC38",
      "Healthcare": "#AD3B9B",
      "Housing": "#FF373C",
      "Miscellaneous": "#B0866D",
      "Office": "#E4759D",
      "Pets": "#783F05",
      "Shopping": "#386BBC",
      "Subscriptions": "#4F7F88",
      "Transportation": "#FFB900",
      "Travel": "#8E7CC3",
      "Utilities": "#009EDF",
      "Rent": "#FF8301"
    };

    return colorMap[props.category] || "#DDDDDD";
  });
  </script>

<template>
  <div class="progress-bar">
    <div 
      class="progress-fill" 
      :style="{
        width: progressWidth,
        backgroundColor: progressColor
      }">
    </div>
  </div>
</template>

<style scoped>
  .progress-bar {
    width: 100%;
    max-width: 170px;
    height: 8px;
    background-color: #DDDDDD;
    border-radius: 8px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.3s ease-in-out;
  }
</style>
