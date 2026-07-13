<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_kycs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected'])->default('pending');
            $table->string('full_legal_name');
            $table->text('pan_number');
            $table->string('pan_image');
            $table->text('aadhaar_number');
            $table->string('aadhaar_front');
            $table->string('aadhaar_back');
            $table->string('gst_number')->nullable();
            $table->text('bank_account_number');
            $table->text('bank_ifsc');
            $table->string('bank_account_name');
            $table->string('cancelled_cheque');
            $table->string('selfie_with_id')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('submitted_at')->useCurrent();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_kycs');
    }
};
