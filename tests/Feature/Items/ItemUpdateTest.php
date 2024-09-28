<?php

test('update item page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/item/edit');

    $response->assertOk();
});
