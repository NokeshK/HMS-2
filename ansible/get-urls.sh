#!/bin/bash

# Quick script to get HMS Application URLs using Ansible

cd "$(dirname "$0")"

echo "=== Getting HMS Application URLs ==="
echo ""

ansible-playbook playbooks/get-urls.yml

