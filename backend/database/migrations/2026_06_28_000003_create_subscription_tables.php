<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // Free, Showcase, Monthly Pro, Yearly Pro
            $table->string('slug')->unique();                // free, showcase, monthly-pro, yearly-pro
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0);    // 0 for free
            $table->string('duration')->default('lifetime'); // monthly, yearly, lifetime
            $table->decimal('commission_rate', 5, 2)->default(10.00); // % commission on sales
            $table->integer('product_limit')->default(10);  // max products allowed
            $table->boolean('is_featured')->default(false); // featured store badge
            $table->boolean('is_active')->default(true);
            $table->json('features')->nullable();            // extra features list
            $table->timestamps();
        });

        Schema::create('store_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->onDelete('cascade');
            $table->foreignId('plan_id')->constrained('subscription_plans')->onDelete('cascade');
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->enum('status', ['active', 'expired', 'cancelled'])->default('active');
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();       // null = lifetime
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_subscriptions');
        Schema::dropIfExists('subscription_plans');
    }
};
