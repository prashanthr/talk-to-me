#!/usr/bin/env bash
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
#kubectl --namespace $KUBE_NAMESPACE apply -f $SCRIPTS_DIR/../namespace
#kubectl --namespace $KUBE_NAMESPACE apply -f $SCRIPTS_DIR/../secret
kubectl --namespace $KUBE_NAMESPACE apply -f $SCRIPTS_DIR/../deployment
kubectl --namespace $KUBE_NAMESPACE get services
