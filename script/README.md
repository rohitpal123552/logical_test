To set up a Kubernetes cluster version `v1.32.1`, here is a **step-by-step guide** using **kubeadm**, which is a popular and straightforward method for creating a production-grade cluster. This will involve a **control plane (master node)** and one or more **worker nodes**.

---

## ✅ Prerequisites

1. **VMs or Physical Machines** (at least 2):

   * OS: Ubuntu 20.04 or 22.04 (recommended)
   * 2 CPUs+, 2GB+ RAM
   * Static or DHCP IP
   * Full network connectivity between nodes

2. **Basic Setup on All Nodes**:

   * Disable swap
   * Install Docker/Containerd
   * Install Kubernetes (kubeadm, kubelet, kubectl)

---

## ⚙️ Step-by-Step Setup (for Kubernetes v1.32.1)

### **1. Prepare all nodes**

```bash
# Disable swap
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab

# Enable required kernel modules
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Set system parameters
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system
```

---

### **2. Install container runtime (containerd)**

```bash
sudo apt-get update && sudo apt-get install -y containerd

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Use systemd cgroup driver
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# Restart containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
```

---

### **3. Install Kubernetes tools (v1.32.1)**

```bash
# Add Kubernetes repo
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
sudo curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install specific version
sudo apt-get update
sudo apt-get install -y kubelet=1.32.1-1.1 kubeadm=1.32.1-1.1 kubectl=1.32.1-1.1
sudo apt-mark hold kubelet kubeadm kubectl
```

---

### **4. Initialize the Control Plane Node**

```bash
# Run on CONTROL PLANE node only
sudo kubeadm init --kubernetes-version=1.32.1 --pod-network-cidr=10.244.0.0/16
```

Save the `kubeadm join` command shown at the end — you'll use it on worker nodes.

---

### **5. Configure kubectl (on control plane)**

```bash
mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

---

### **6. Install Pod Network Add-on**

For example, with **Flannel**:

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

---

### **7. Join Worker Nodes**

Run this on each **worker node**, replacing the token and IP with your actual control plane values:

```bash
sudo kubeadm join <control-plane-ip>:6443 --token <token> \
    --discovery-token-ca-cert-hash sha256:<hash>
```

---

### **8. Verify the Cluster**

Run on the control plane:

```bash
kubectl get nodes
kubectl get pods -A
```

---

## 🧼 Optional: Enable bash completion

```bash
echo "source <(kubectl completion bash)" >> ~/.bashrc
```

---

Would you like a diagram of the architecture or a script to automate these steps?
