#!/usr/bin/env bash
kubectl --namespace $KUBE_NAMESPACE patch deployment $KUBE_APP_NAME -p \
  "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
