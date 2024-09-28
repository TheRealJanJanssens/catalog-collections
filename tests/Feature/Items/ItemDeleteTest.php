<?php

test('remove item page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/item/delete');

    $response->assertOk();
});
