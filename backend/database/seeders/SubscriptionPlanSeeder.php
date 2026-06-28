<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name'            => 'Free',
                'slug'            => 'free',
                'description'     => 'Get started with basic store features.',
                'price'           => 0.00,
                'duration'        => 'lifetime',
                'commission_rate' => 10.00,
                'product_limit'   => 10,
                'is_featured'     => false,
                'features'        => ['10 products', 'Basic store page', '10% commission'],
            ],
            [
                'name'            => 'Showcase',
                'slug'            => 'showcase',
                'description'     => 'Perfect for small sellers wanting more visibility.',
                'price'           => 499.00,
                'duration'        => 'lifetime',
                'commission_rate' => 8.00,
                'product_limit'   => 50,
                'is_featured'     => false,
                'features'        => ['50 products', 'Featured badge', '8% commission'],
            ],
            [
                'name'            => 'Monthly Pro',
                'slug'            => 'monthly-pro',
                'description'     => 'Professional plan billed monthly.',
                'price'           => 999.00,
                'duration'        => 'monthly',
                'commission_rate' => 5.00,
                'product_limit'   => 500,
                'is_featured'     => true,
                'features'        => ['500 products', 'Priority listing', '5% commission', 'Analytics'],
            ],
            [
                'name'            => 'Yearly Pro',
                'slug'            => 'yearly-pro',
                'description'     => 'Best value — professional plan billed yearly.',
                'price'           => 7999.00,
                'duration'        => 'yearly',
                'commission_rate' => 3.00,
                'product_limit'   => 999999,
                'is_featured'     => true,
                'features'        => ['Unlimited products', 'Top listing', '3% commission', 'Analytics', 'Dedicated support'],
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::updateOrCreate(
                ['slug' => $plan['slug']], // find by slug
                $plan                       // update ALL fields
            );
        }

        $this->command->info('Subscription plans seeded!');
    }
}
