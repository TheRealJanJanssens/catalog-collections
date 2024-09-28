<?php

test('add item page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/item/add');

    $response->assertOk();
});
