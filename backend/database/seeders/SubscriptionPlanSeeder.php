<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('subscription_plans')->insert([
            [
                'name' => 'Free',
                'slug' => 'free',
                'description' => 'Start selling with zero upfront cost.',
                'price' => 0.00,
                'duration' => 'lifetime',
                'commission_rate' => 10.00,
                'product_limit' => 10,
                'is_featured' => false,
                'is_active' => true,
                'can_sell' => true,
                'show_seller_info' => false,
                'features' => json_encode(['Basic Analytics']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Showcase',
                'slug' => 'showcase',
                'description' => 'Showcase your catalog without online sales.',
                'price' => 199.00,
                'duration' => 'monthly',
                'commission_rate' => 0.00,
                'product_limit' => 20,
                'is_featured' => false,
                'is_active' => true,
                'can_sell' => false,
                'show_seller_info' => false,
                'features' => json_encode(['Basic Analytics', 'Lead Generation Options']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Monthly Pro',
                'slug' => 'monthly-pro',
                'description' => 'Unlimited products, 0% commission.',
                'price' => 499.00,
                'duration' => 'monthly',
                'commission_rate' => 0.00,
                'product_limit' => 999999,
                'is_featured' => true,
                'is_active' => true,
                'can_sell' => true,
                'show_seller_info' => true,
                'features' => json_encode(['Full Analytics', 'Priority Listing', '0% Commission', 'Seller Contact Info Shown']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Yearly Pro',
                'slug' => 'yearly-pro',
                'description' => 'Best value for serious sellers.',
                'price' => 4999.00,
                'duration' => 'yearly',
                'commission_rate' => 0.00,
                'product_limit' => 999999,
                'is_featured' => true,
                'is_active' => true,
                'can_sell' => true,
                'show_seller_info' => true,
                'features' => json_encode(['Full Analytics', 'Priority Listing', '0% Commission', 'Seller Contact Info Shown', '2 Months Free']),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
